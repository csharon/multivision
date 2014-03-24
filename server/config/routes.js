var auth = require('./auth');

module.exports = function (app) {
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params);
  });

  app.post('/api/v1/session', auth.authenticate);

  app.del('/api/v1/session', function(req, res) {
    req.logout();
    res.send(200);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });


}