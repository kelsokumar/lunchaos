import { db } from '../src/lib/db'
import { cafes, foodItems, ratings } from '../src/lib/db/schema'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'

async function initDb() {
  try {
    // Drop existing tables if they exist
    await db.run('DROP TABLE IF EXISTS ratings')
    await db.run('DROP TABLE IF EXISTS food_items')
    await db.run('DROP TABLE IF EXISTS cafes')

    // Create tables using schema
    await db.run(`
      CREATE TABLE cafes (
        id TEXT PRIMARY KEY,
        building TEXT NOT NULL,
        name TEXT NOT NULL
      )
    `)

    await db.run(`
      CREATE TABLE food_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cafe_id TEXT NOT NULL,
        name TEXT NOT NULL,
        ingredients TEXT,
        category TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cafe_id) REFERENCES cafes(id)
      )
    `)

    await db.run(`
      CREATE TABLE ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        food_item_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        image_url TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (food_item_id) REFERENCES food_items(id)
      )
    `)

    await db.run(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Database tables created successfully')
  } catch (error) {
    console.error('Error creating tables:', error)
    process.exit(1)
  }
}

async function importCsvData(csvPath: string) {
  try {
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    })

    // First, insert unique cafes
    const uniqueCafes = new Map()
    for (const record of records) {
      if (!uniqueCafes.has(record.cafe_id)) {
        uniqueCafes.set(record.cafe_id, {
          id: record.cafe_id,
          building: record.building,
          name: record.cafe
        })
      }
    }

    // Insert cafes
    for (const cafe of Array.from(uniqueCafes.values())) {
      await db.insert(cafes).values(cafe)
    }
    console.log('Cafes imported successfully')

    // Insert food items
    for (const record of records) {
      await db.insert(foodItems).values({
        cafeId: record.cafe_id,
        name: record.food_item,
        ingredients: record.ingredients,
        category: 'lunch' // Default to lunch for now, we can update this later
      })
    }

    console.log('Food items imported successfully')
  } catch (error) {
    console.error('Error importing CSV data:', error)
    process.exit(1)
  }
}

// Run the initialization
const csvPath = process.argv[2]
if (!csvPath) {
  console.error('Please provide the path to the CSV file')
  process.exit(1)
}

initDb()
  .then(() => importCsvData(csvPath))
  .then(() => {
    console.log('Database initialization completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error during initialization:', error)
    process.exit(1)
  }) 