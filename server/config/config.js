
var rootPath = process.env.PWD = process.cwd();
console.log('App rootPath: ' + rootPath);

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/multivision',
    port: process.env.PORT || 3030
  },

  production: {
    rootPath: rootPath,
    db: process.env.MONGOHQ_URL,
    port: process.env.PORT || 80
  }
}