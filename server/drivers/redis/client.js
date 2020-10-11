const redis = require('redis'),
    RedisCache = require('./cache');

module.exports = app => {
    const { REDIS_HOST, REDIS_PORT, REDIS_PREFIX } = app.settings.ENV.vars;

    const client = redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT
    });

    app.set(
        'REDIS_CACHE',
        new RedisCache(client, {
            prefix: REDIS_PREFIX,
            host: REDIS_HOST,
            port: REDIS_PORT
        })
    );
};
