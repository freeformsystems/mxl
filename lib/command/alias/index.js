var ls = require('./ls');

module.exports = function alias(info, req, next){
  if(!info.args.length) {
    return ls(info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
