const Pharmacy = require('./pharmacy.model.js')


exports.postSignup = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  const pharmacy = new Pharmacy({
    email: req.body.email,
    password: req.body.password
  });

  Pharmacy.findOne({ email: req.body.email }, (err, existingPharmacy) => {
    if (err) { return next(err); }
    if (existingPharmacy) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/signup');
    }
    pharmacy.save((err) => {
      if (err) { return next(err); }
      req.logIn(pharmacy, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};