import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import routes from './routes';
// import { isAuthenticated } from './utils/isAuthenticated';

const app = express();
const expressLayouts = require('express-ejs-layouts');
const cors = require("cors");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('res'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use(express.static(path.join(__dirname, 'res')));
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')

app.use('/merk', routes.merk);
app.use('/tahun', routes.tahun);

app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ` + process.env.PORT);
});