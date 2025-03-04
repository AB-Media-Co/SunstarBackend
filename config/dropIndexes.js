// dropIndexes.js
import Room from '../models/Room.js';

export const dropUnwantedIndexes = async () => {
  try {
    // List current indexes
    const indexes = await Room.collection.getIndexes();
    console.log("Current indexes on Room collection:", indexes);

    // If the single-field index on RoomTypeID exists, drop it.
    if (indexes.RoomTypeID_1) {
      console.log("Dropping single-field index on RoomTypeID...");
      await Room.collection.dropIndex("RoomTypeID_1");
      console.log("Dropped RoomTypeID_1 index.");
    }
    
    console.log("Index cleanup complete.");
  } catch (error) {
    console.error("Error dropping indexes:", error);
  }
};
