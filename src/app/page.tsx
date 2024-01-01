import { db } from '@/server/db';
import { comparisons } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function Home() {
  const cpuComparisons = await db.query.comparisons.findMany({
    where: eq(comparisons.type, 'cpu'),
  });

  const gpuComparisons = await db.query.comparisons.findMany({
    where: eq(comparisons.type, 'gpu'),
  });

  return (
    <div className="container mx-auto px-4">
      <div className="my-4 flex flex-col items-start gap-8">
        {cpuComparisons.length > 0 ? (
          <table className="text-left">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {cpuComparisons.map((comparison) => (
                <tr key={comparison.id}>
                  <td>{comparison.id}</td>
                  <td>
                    <Link
                      className="underline underline-offset-4"
                      href={`/comparisons/${comparison.id}`}
                    >
                      {comparison.name}
                    </Link>
                  </td>
                  <td>{comparison.type}</td>
                  <td>{new Date(comparison.createdAt).toISOString()}</td>
                  <td>
                    {comparison.updatedAt
                      ? new Date(comparison.updatedAt).toISOString()
                      : 'never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No CPU comparisons found.</p>
        )}

        {gpuComparisons.length > 0 ? (
          <table className="text-left">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {gpuComparisons.map((comparison) => (
                <tr key={comparison.id}>
                  <td>{comparison.id}</td>
                  <td>
                    <Link
                      className="underline underline-offset-4"
                      href={`/comparisons/${comparison.id}`}
                    >
                      {comparison.name}
                    </Link>
                  </td>
                  <td>{comparison.type}</td>
                  <td>{new Date(comparison.createdAt).toISOString()}</td>
                  <td>
                    {comparison.updatedAt
                      ? new Date(comparison.updatedAt).toISOString()
                      : 'never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No GPU comparisons found.</p>
        )}
      </div>
    </div>
  );
}
