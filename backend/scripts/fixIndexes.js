// backend/scripts/fixIndexes.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const coll = mongoose.connection.db.collection('services');

    const indexes = await coll.indexes();
    console.log('Existing indexes:', indexes);

    const idx = indexes.find(i => i.name === 'clientId_1' || (i.key && i.key.clientId === 1));
    if (idx) {
      console.log('Dropping index:', idx.name);
      await coll.dropIndex(idx.name);
      console.log('Index dropped.');
    } else {
      console.log('clientId_1 index not found — nothing to drop.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
