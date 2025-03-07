// dropIndexes.js
import Room from '../models/Room.js';

export const dropUnwantedIndexes = async () => {
  try {
    // Fetch all indexes on the Room collection
    const indexes = await Room.collection.indexInformation();
    console.log("Current indexes on Room collection:", indexes);

    const unwantedIndexes = ['RateTypeID_1', 'RoomTypeID_1']; // Add more if needed

    for (const indexName of unwantedIndexes) {
      if (indexes[indexName]) {
        console.log(`Dropping index: ${indexName}...`);
        await Room.collection.dropIndex(indexName);
        console.log(`Dropped ${indexName} index.`);
      } else {
        console.log(`Index ${indexName} does not exist, skipping.`);
      }
    }

    console.log("Index cleanup complete.");
  } catch (error) {
    console.error("Error dropping indexes:", error);
  }
};