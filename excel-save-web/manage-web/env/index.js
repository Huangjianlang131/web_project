
var fileName = 'dev'// 本地开发的接口跟地址
// var fileName = 'test'// 上线前的测试版本的接口跟地址
// var fileName = "prod"; //线上生产的接口跟地址
const Global = require(`./${fileName}.js`)

module.exports = Global

