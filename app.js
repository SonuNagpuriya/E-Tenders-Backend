import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import UserRouter       from './routes/user.router.js';
import CategoryRouter   from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import productRouter    from './routes/product.router.js';
import BidRouter        from './routes/bid.router.js';

const app = express();

// middlewares
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route mounts
app.use('/user',        UserRouter);
app.use('/category',    CategoryRouter);
app.use('/subcategory', SubCategoryRouter);
app.use('/product',     productRouter);
app.use('/bid',         BidRouter);

// dynamic port for cloud hosts
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅  Server running on port ${PORT}`));
