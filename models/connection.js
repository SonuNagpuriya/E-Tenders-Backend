// import mongoose from 'mongoose';
// const url="mongodb://localhost:27017/tender";
// mongoose.connect(url);
// console.log("Successfully connected to mongodb database...");
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();                    

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Successfully connected to MongoDB database...'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));
