import mongoose from 'mongoose';
import config from 'config';

export async function connectToMongo() {
  try {
    await mongoose.connect(config.get('dbUri'));
    console.log('MongoDB connected');
  } catch (err) {
    console.error('error connecting to db', err);
    process.exit(1);
  }
}
