const mongoose = require('mongoose'),
    bcryptjs = require('bcryptjs')
    jwt = require('jsonwebtoken'),
    express = require('express'),
    cors = require('cors'),
    env = require('dotenv').config(),
    Schema = mongoose.Schema,
    cron = require("node-cron"),
    fs = require("fs"),
    nodemailer = require("nodemailer"),
    kue = require('kue')

module.exports = { mongoose, bcryptjs, jwt, express, cors, env, Schema, cron, fs, nodemailer, kue }