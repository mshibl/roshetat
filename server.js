const express 		= require('express');
const app 			= express();

// Connection to MongoDB
const mongoose		= require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI)

// HTTP request logger
const morgan     	= require('morgan');
app.use(morgan('dev'));

// Load environment variables from a .env file into process.env
const dotenv = require('dotenv');

// Node.js body parsing, available under the req.body property
const bodyParser 	= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const webpack 		= require('webpack');
const path 			= require('path');