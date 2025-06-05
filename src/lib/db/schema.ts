import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const cafes = sqliteTable('cafes', {
  id: text('id').primaryKey(),
  building: text('building').notNull(),
  name: text('name').notNull(),
})

export const foodItems = sqliteTable('food_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cafeId: text('cafe_id').references(() => cafes.id).notNull(),
  name: text('name').notNull(),
  ingredients: text('ingredients'),
  category: text('category').notNull(), // 'breakfast' or 'lunch'
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export const ratings = sqliteTable('ratings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  foodItemId: integer('food_item_id').references(() => foodItems.id).notNull(),
  username: text('username').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  imageUrl: text('image_url'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const feedback = sqliteTable('feedback', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  text: text('text').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
}) 