import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  timestamp,
  tinyint,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `table-tool_${name}`);

export const comparisons = mysqlTable('comparisons', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  type: mysqlEnum('type', ['cpu', 'gpu']).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
});

export const comparisonsRelations = relations(comparisons, ({ many }) => ({
  comparisonsToProducts: many(comparisonsToProducts),
}));

export const products = mysqlTable(
  'products',
  {
    id: int('id').primaryKey().autoincrement(),
    code: varchar('code', { length: 256 }).notNull().unique(),
    name: varchar('name', { length: 256 }),
    type: mysqlEnum('type', ['cpu', 'gpu']).notNull(),
    score: int('score', { unsigned: true }),
    cores: tinyint('cores', { unsigned: true }),
    price: decimal('price', { precision: 10, scale: 2 }),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at').onUpdateNow(),
  },
  (table) => ({
    codeIndex: index('code_idx').on(table.code),
  }),
);

export const productsRelations = relations(products, ({ many }) => ({
  comparisonsToProducts: many(comparisonsToProducts),
}));

export const comparisonsToProducts = mysqlTable(
  'comparisons_to_products',
  {
    comparisonId: int('comparison_id'),
    productId: int('product_id'),
    active: boolean('active'),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.comparisonId, t.productId] }),
      unq: unique().on(t.comparisonId, t.active),
    };
  },
);

export const comparisonsToProductsRelations = relations(
  comparisonsToProducts,
  ({ one }) => ({
    comparison: one(comparisons, {
      fields: [comparisonsToProducts.comparisonId],
      references: [comparisons.id],
    }),
    product: one(products, {
      fields: [comparisonsToProducts.productId],
      references: [products.id],
    }),
  }),
);
