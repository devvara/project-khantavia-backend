import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import recipeRouter from './router/recipe.js';
import noticeRouter from './router/notice.js';
import { db, sequelize } from './db/database.js';
import { config } from './config.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

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