const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public'),
    database: 'mongodb://localhost/cocktails',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    facebook: {
        appId: '2656439007968356',
        appSecret: 'acdf224e9d30b54467d0080c6ecac2b6'
    }
};