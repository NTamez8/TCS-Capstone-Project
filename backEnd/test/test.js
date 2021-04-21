var assert = require('assert');

let chai = require('chai');
let http = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(http);