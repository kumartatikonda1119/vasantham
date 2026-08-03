const mongoose = require('mongoose');
const LifeQuote = require('./models/LifeQuote');
const Quote = require('./models/Quote');
require('dotenv').config();

const mergeLifeQuotes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vasantham');
    console.log('Connected to DB');

    const lifeQuotes = await LifeQuote.find({});
    
    if (lifeQuotes.length > 0) {
      const content = lifeQuotes.map(lq => `${lq.subject} ${lq.action}`);
      
      const newQuote = new Quote({
        title: 'జీవన సూత్రాలు',
        content: content,
        author: 'Geeta Vasanta Laxmi (వసంతం)',
        status: 'published'
      });
      
      await newQuote.save();
      console.log('Successfully merged LifeQuotes into Quote (Commentary)!');
      
      // Optionally drop the LifeQuote collection, but we'll leave it in DB and just remove from codebase
      // await LifeQuote.collection.drop();
    } else {
      console.log('No life quotes to merge.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

mergeLifeQuotes();
