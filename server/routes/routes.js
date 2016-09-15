const app 					= require('../../app.js')
const pharmacyController 	= require('../pharmacy/pharmacy.controller.js')

app.post('/signup', pharmacyController.postSignup);