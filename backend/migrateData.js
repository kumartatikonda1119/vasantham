const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Poem = require('./models/Poem');
const Writing = require('./models/Writing');
const Quote = require('./models/Quote');
const AksharaArdham = require('./models/AksharaArdham');
const LifeQuote = require('./models/LifeQuote');

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vasantham');
    console.log('Connected to MongoDB for migration...');

    // 1. Migrate Poems
    const poemsPath = path.join(__dirname, '../frontend/src/data/kavithalu.json');
    if (fs.existsSync(poemsPath)) {
      const poemsData = JSON.parse(fs.readFileSync(poemsPath, 'utf8'));
      await Poem.deleteMany({});
      const poemsToInsert = poemsData.map(p => ({
        title: p.title,
        content: p.content, // array of strings
        author: 'Geeta Vasanta Laxmi (వసంతం)',
        status: 'published'
      }));
      await Poem.insertMany(poemsToInsert);
      console.log(`✅ Migrated ${poemsToInsert.length} Poems!`);
    }

    // 2. Migrate Writings
    const writingsPath = path.join(__dirname, '../frontend/src/data/writingsdata.json');
    if (fs.existsSync(writingsPath)) {
      const writingsData = JSON.parse(fs.readFileSync(writingsPath, 'utf8'));
      await Writing.deleteMany({});
      const writingsToInsert = writingsData.map(w => ({
        title: w.title,
        content: w.content, // array of strings
        author: w.author || 'Geeta Vasanta Laxmi (వసంతం)',
        status: 'published'
      }));
      await Writing.insertMany(writingsToInsert);
      console.log(`✅ Migrated ${writingsToInsert.length} Writings!`);
    }

    // 3. Migrate Commentary (Quotes)
    const commentaryPath = path.join(__dirname, '../frontend/src/data/commentrypage.json');
    if (fs.existsSync(commentaryPath)) {
      const commentaryData = JSON.parse(fs.readFileSync(commentaryPath, 'utf8'));
      await Quote.deleteMany({});
      const quotesToInsert = commentaryData.map(q => ({
        title: q.title,
        content: q.content, // array of strings
        author: 'Geeta Vasanta Laxmi (వసంతం)',
        status: 'published'
      }));
      await Quote.insertMany(quotesToInsert);
      console.log(`✅ Migrated ${quotesToInsert.length} Commentaries (Quotes)!`);
    }

    // 4. Migrate Akshara Ardham and Life Quotes
    const aksharaPath = path.join(__dirname, '../frontend/src/data/aksharadata.json');
    if (fs.existsSync(aksharaPath)) {
      const aksharaData = JSON.parse(fs.readFileSync(aksharaPath, 'utf8'));
      
      // Akshara Ardhams
      await AksharaArdham.deleteMany({});
      const aksharasToInsert = aksharaData.aksharaardams.map(a => ({
        title: a.title,
        description: a.description || '',
        footerMessage: a.footerMessage || '',
        lines: a.lines, // array of { letter, text }
        status: 'published'
      }));
      await AksharaArdham.insertMany(aksharasToInsert);
      console.log(`✅ Migrated ${aksharasToInsert.length} Akshara Ardhams!`);

      // Life Quotes (Jeevana Sootralu)
      await LifeQuote.deleteMany({});
      if (aksharaData.quotes && aksharaData.quotes.items) {
        const lifeQuotesToInsert = aksharaData.quotes.items.map(lq => ({
          subject: lq.subject,
          action: lq.action,
          status: 'published'
        }));
        await LifeQuote.insertMany(lifeQuotesToInsert);
        console.log(`✅ Migrated ${lifeQuotesToInsert.length} Life Quotes!`);
      }
    }

    console.log('🎉 Full data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

migrateData();
