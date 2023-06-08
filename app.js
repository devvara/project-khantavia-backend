import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRouter from './router/auth.js';
import recipeRouter from './router/recipe.js';
import noticeRouter from './router/notice.js';
import { db, sequelize } from './db/database.js';
import { config } from './config.js';

const app = express();

// Middleware: Parse incoming requests with JSON payloads
app.use(express.json());
// Middleware: Apply Helmet security headers to enhance application security
app.use(helmet());
// Middleware: Enable Cross-Origin Resource Sharing(CORS) for handling request from different origins
app.use(cors());
// Middleware: Log HTTP requests in concise format using the 'tiny' predefined format of Morgan logger
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/recipes', recipeRouter);
app.use('/notices', noticeRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res,next) => {
  console.error(error);
  res.sendStatus(500);
})

sequelize.sync().then(client => {
  app.listen(config.host.port);
});


// Database connection
db.getConnection().then((connection) => console.log("DB Connection Success"));