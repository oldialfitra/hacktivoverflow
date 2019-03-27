const mongoose = require('mongoose'),
    bcryptjs = require('bcryptjs')
    jwt = require('jsonwebtoken'),
    express = require('express'),
    cors = require('cors'),
    env = require('dotenv').config(),
    Schema = mongoose.Schema

module.exports = { mongoose, bcryptjs, jwt, express, cors, env, Schema }