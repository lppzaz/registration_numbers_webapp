[![Build Status](https://travis-ci.org/lppzaz/registration_numbers_webapp.svg?branch=master)](https://travis-ci.org/lppzaz/registration_numbers_webapp)

# ExpressJS Setup

## Install

```
$ mkdir registration_numbers_webapp
$ cd registration_numbers_webapp
$ npm init --y
$ npm install express --save

```
# Create postgres Database
sudo -u postgres createdb registrations
## Flash Setup

### Install

```
npm install --save express-flash
npm install --save express-session
npm install express-handlebars
```
# nodemon Setup

## Install
```
npm install --save-dev nodemon
```
# Middleware Setup
```
$ npm install body-parser
you can use express.static because express.static(root, [options])
This is a built-in middleware function in Express. It serves static files and is based on serve-static.


```
## Install

# index.js Setup
```
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
app.use(express.static('public'));
  ```

```
start the server:
var server = app.listen(3000);
```

