import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import recipeRouter from './router/recipe.js';
import { db } from './db/database.js';
import { config } from './config.js';
import request from 'request';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/recipes', recipeRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res,next) => {
  console.error(error);
  res.sendStatus(500);
})

db.getConnection().then((connection) => console.log("DB Connection Success"));
app.listen(config.host.port);