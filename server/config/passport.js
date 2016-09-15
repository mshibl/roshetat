const LocalStrategy   	= require('passport-local').Strategy;
const Pharmacy			= require('../pharmacy/pharmacy.model.js')

module.exports = function(passport){
    passport.serializePharmacy(function(pharmacy, done) {
        done(null, pharmacy.id);
    });

    // used to deserialize the pharmacy
    passport.deserializePharmacy(function(id, done) {
        Pharmacy.findById(id, function(err, pharmacy) {
            done(err, pharmacy);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        pharmacynameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // Pharmacy.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a pharmacy whose email is the same as the forms email
        // we are checking to see if the pharmacy trying to login already exists
        Pharmacy.findOne({ 'local.email' :  email }, function(err, pharmacy) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a pharmacy with that email
            if (pharmacy) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no pharmacy with that email
                // create the pharmacy
                var newPharmacy            = new Pharmacy();

                // set the pharmacy's local credentials
                newPharmacy.local.email    = email;
                newPharmacy.local.password = newPharmacy.generateHash(password);

                // save the pharmacy
                newPharmacy.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newPharmacy);
                });
            }

        });    

        });

    }));
}