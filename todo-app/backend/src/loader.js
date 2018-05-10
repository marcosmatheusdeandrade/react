const server = require('./config/server')
require('./config/database')
require('./config/routes')(server) //invocando uma funçao e passando server como parametro