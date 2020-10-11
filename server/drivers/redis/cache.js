// const fetchMethod = require('./fetch'),
//     deleteMethod = require('./delete'),
//     saveMethod = require('./save');

module.exports = class {
    constructor(client, config) {
        this.client = client;
        this.config = config;
    }

    async use(key, value) {
        const cacheValue = await this.fetch(key);

        if (!cacheValue) {
            /** No need for waiting the record to be saved */
            this.save(key, value);
        }

        return cacheValue;
    }

    // async save(key, value) {
    //     return await saveMethod(this.client, this.config, key, value);
    // }
    //
    // async fetch(key) {
    //     return await fetchMethod(this.client, this.config, key);
    // }
    //
    // async delete(pattern) {
    //     return await deleteMethod(this.client, this.config, pattern);
    // }
};
