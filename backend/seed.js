const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/Admin');
const Poem = require('./models/Poem');
const Writing = require('./models/Writing');
const Quote = require('./models/Quote');
const AksharaArdham = require('./models/AksharaArdham');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vasantham');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing Admin
    await Admin.deleteMany({});

    // Create default Admin account
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'adminvasantham2026',
    });
    await admin.save();
    console.log(`✅ Admin created! Username: ${admin.username}`);

    // Seed sample poems if empty
    const poemCount = await Poem.countDocuments();
    if (poemCount === 0) {
      await Poem.create([
        {
          title: 'వసంత గానం',
          content: `చిగురించిన కోరికల కొమ్మలలో\nకమ్మని కోకిల కిలకిలలు,\nవసంత శోభ పరిమళించెను\nహృదయ లోగిలి తలుపుల వద్ద.`,
          author: 'Geeta Vasanta Laxmi (వసంతం)',
          status: 'published',
        },
        {
          title: 'అక్షర వృక్షం',
          content: `నా భావాల నాటు విత్తులు\nఅక్షరాలై చిగురించెను,\nచదువరుల మనసులో నిలిచి\nశాశ్వత సత్యమై వెలిగెను.`,
          author: 'Geeta Vasanta Laxmi (వసంతం)',
          status: 'published',
        }
      ]);
      console.log('✅ Sample Poems seeded!');
    }

    // Seed sample writings if empty
    const writingCount = await Writing.countDocuments();
    if (writingCount === 0) {
      await Writing.create([
        {
          title: 'మాతృభాషా వైభవం',
          content: `తెలుగు భాష తీపిదనం, అందం వర్ణనాతీతం. మాతృభాషలో వ్యక్తపరిచే భావం హృదయానికి నేరుగా చేరుతుంది. సాహిత్య సేవ మన సంస్కృతిని కాపాడే అమూల్యమైన బాధ్యత.`,
          author: 'Geeta Vasanta Laxmi (వసంతం)',
          status: 'published',
        }
      ]);
      console.log('✅ Sample Writings seeded!');
    }

    // Seed sample quotes if empty
    const quoteCount = await Quote.countDocuments();
    if (quoteCount === 0) {
      await Quote.create([
        {
          text: 'వసంతం ప్రకృతిలో ఒక ఋతువు మాత్రమే కాదు, మనసులో ఒక అనుభూతి.',
          author: 'వసంతం',
          status: 'published',
        },
        {
          text: 'మనసు పలికిన ప్రతి భావానికి ఒక అక్షర రూపం.',
          author: 'వసంతం',
          status: 'published',
        }
      ]);
      console.log('✅ Sample Quotes seeded!');
    }

    // Seed sample Akshara Ardham if empty
    const aksharaCount = await AksharaArdham.countDocuments();
    if (aksharaCount === 0) {
      await AksharaArdham.create([
        { letter: 'వ', meaning: 'వర్షం / వసంతం', description: 'సమృద్ధి మరియు కొత్త ప్రారంభాలకు ప్రతీక.' },
        { letter: 'సం', meaning: 'సంస్కారం / సమ్మేళనం', description: 'సమగ్రమైన ఆలోచనలు మరియు జీవన మూల్యాలు.' },
        { letter: 'తం', meaning: 'తపస్సు / త్యాగం', description: 'నిరంతర సాహిత్యా సాధన మరియు అంకితభావం.' }
      ]);
      console.log('✅ Sample Akshara Ardham seeded!');
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
