import { AppDataSource } from '../config/database';

async function runMigrations() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');

    await AppDataSource.runMigrations();
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runMigrations(); 