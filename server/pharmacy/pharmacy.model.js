const mongoose 	= require('mongoose');
const bcrypt	= require('bcrypt')

const pharmacySchema = new mongoose.Schema({
	email: String,

	profile: {
		name: String,
		location: String,
		website: String,
		logo: String
	}
}, {timestamps: true});

// methods ======================
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


const Pharmacy = mongoose.model('Pharmacy', userSchema);