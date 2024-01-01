import { db } from '@/server/db';
import { comparisons } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});
const numberFormatter = new Intl.NumberFormat('en-GB');

export default async function ComparisonPage({
  params,
}: {
  params: { id: number };
}) {
  const comparison = await db.query.comparisons.findFirst({
    where: eq(comparisons.id, params.id),
    with: {
      comparisonsToProducts: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!comparison) {
    notFound();
  }

  const activeComparison = comparison.comparisonsToProducts.filter(
    (c) => c.active,
  )[0];
  const activeComparisonProductPriceAsNumber = parseFloat(
    activeComparison?.product?.price ?? '0',
  );

  return (
    <div className="container mx-auto px-4">
      <div className="my-4">
        <Link href="/">Return to dashboard</Link>
        {/* <pre>
          <code>{JSON.stringify(comparison, null, 4)}</code>
        </pre> */}
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Cores</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.comparisonsToProducts
              .sort((a, b) => {
                if (
                  a.product &&
                  b.product &&
                  a.product.price &&
                  b.product.price
                ) {
                  if (a.product?.price > b.product.price) return 1;
                  if (a.product?.price < b.product.price) return -1;
                }

                return 0;
              })
              .map(({ active, product, productId }) => {
                const priceAsNumber = parseFloat(product?.price ?? '0.00');
                const formattedPrice = currencyFormatter.format(priceAsNumber);
                const formattedScore = numberFormatter.format(
                  product?.score ?? 0,
                );

                const priceDiff = !active
                  ? Math.abs(
                      priceAsNumber - activeComparisonProductPriceAsNumber,
                    )
                  : null;
                const scoreDiff = !active
                  ? Math.abs(
                      (product?.score ?? 0) -
                        (activeComparison?.product?.score ?? 0),
                    )
                  : null;

                const formattedPriceDiff = priceDiff
                  ? numberFormatter.format(priceDiff)
                  : null;
                const formattedScoreDiff = scoreDiff
                  ? numberFormatter.format(scoreDiff)
                  : null;

                return (
                  <TableRow
                    className={cn('*:py-2', active && 'bg-muted')}
                    key={productId}
                  >
                    <TableCell className="tabular-nums">
                      {product?.code}
                    </TableCell>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {product?.cores}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formattedScoreDiff && (
                        <Badge className="mr-2">
                          {product?.score &&
                          activeComparison?.product?.score &&
                          product.score > activeComparison.product.score
                            ? `+${formattedScoreDiff}`
                            : `-${formattedScoreDiff}`}
                        </Badge>
                      )}
                      {formattedScore}
                    </TableCell>
                    <TableCell className="space-x-2 text-right tabular-nums">
                      {formattedPriceDiff && (
                        <Badge className="mr-2">
                          {priceAsNumber > activeComparisonProductPriceAsNumber
                            ? `+${formattedPriceDiff}`
                            : `-${formattedPriceDiff}`}
                        </Badge>
                      )}
                      {formattedPrice}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
