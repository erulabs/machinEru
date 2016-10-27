// @flow

import { parseUris } from './helpers.js'

export const NODE_NAME = process.env.NODE_NAME || Math.random().toString(36).substr(2, 5)

export const MYSQL_SERVERS = parseUris(process.env.MYSQL_URIS)
export const MYSQL_USER = process.env.MYSQL_USER || 'machineru'
export const MYSQL_PASS = process.env.MYSQL_PASS || 'somethingMadeUpForMYSQL'
export const MYSQL_DB = process.env.MYSQL_DB || 'machineru'

export const STATSD_SERVERS = parseUris(process.env.STATSD_URIS)
export const REDIS_SERVERS = parseUris(process.env.REDIS_URIS)

export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'
export const LOG_FILE = process.env.LOG_FILE

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || null
