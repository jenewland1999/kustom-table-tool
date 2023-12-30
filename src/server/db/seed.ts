import { db } from '@/server/db';
import { comparisons, products, comparisonsToProducts } from './schema';
import { faker } from '@faker-js/faker';
import { logger } from '@/logger';

logger.log({
  level: 'warn',
  message: 'Deleting all data from database',
});
await db.delete(comparisons);
await db.delete(products);
await db.delete(comparisonsToProducts);

logger.log({ level: 'info', message: 'Seeding database' });
let productId = 0;
for (let i = 1; i <= 10; i++) {
  const type = faker.helpers.arrayElement<'cpu' | 'gpu'>(['cpu', 'gpu']);

  logger.log({
    level: 'info',
    message: 'Creating a new comparison',
    productType: type,
    comparisonCounter: i,
  });

  await db.insert(comparisons).values({
    id: i,
    name: faker.lorem.words({ min: 1, max: 5 }),
    type: type,
  });

  for (let ii = 1; ii <= 100; ii++) {
    productId++;
    if (type === 'cpu') {
      logger.log({
        level: 'info',
        message: 'Creating a new product',
        productType: type,
        productCounter: ii,
      });

      await db.insert(products).values({
        id: productId,
        code: faker.string.numeric({ allowLeadingZeros: true, length: 6 }),
        type: type,
        cores: faker.number.int({ min: 0, max: 32 }),
        price: faker.commerce.price({ min: 200, max: 650 }),
        score: faker.number.int({ min: 25000, max: 65000 }),
      });

      if (ii % 8 === 0) {
        logger.log({
          level: 'info',
          message: 'Creating a new product comparison',
          productType: type,
          comparisonCounter: i,
          productCounter: ii,
        });

        await db
          .insert(comparisonsToProducts)
          .values({ comparisonId: i, productId: ii });
      }
    }
  }
}
