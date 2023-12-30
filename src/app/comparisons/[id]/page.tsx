import { db } from '@/server/db';
import { comparisons } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

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

  return (
    <div className="container mx-auto px-4">
      <div className="my-4">
        <pre>
          <code>{JSON.stringify(comparison, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
