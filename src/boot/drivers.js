let mySQL = require('../server/drivers/mySQL'),
    redis = require('../server/drivers/redis/client');

module.exports = app => {
    mySQL(app);
    // redis(app);
};
