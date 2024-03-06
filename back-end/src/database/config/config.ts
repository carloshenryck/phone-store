import 'dotenv/config'
import { Options } from 'sequelize'
import pg from "pg"

const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE, POSTGRES_HOST} = process.env

const config: Options = {
  "username": POSTGRES_USER,
  "password": POSTGRES_PASSWORD,
  "database": POSTGRES_DATABASE,
  "host": POSTGRES_HOST,
  "dialect": "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
}

module.exports = config;