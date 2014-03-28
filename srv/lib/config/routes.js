var auth = require('./auth'),
    UserCtrl = require('../controllers/users');

module.exports = function (app) {

  app.get('/api/v1/admin/users', auth.requiresRole('admin'), UserCtrl.getAll);

  app.post('/api/v1/session', auth.authenticate);

  app.get('/api/v1/session/me', function (req, resp) {
    if (req.user) {
      resp.send(req.user);
    } else {
      resp.send(401);
    }
  });

  app.del('/api/v1/session', function (req, res) {
    req.logout();
    res.send(200);
  });

  app.get('*', function (req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });

};