module.exports = function(app) {
	const signup = require('../controller/signup.controller.js');
	const jwt = require("jsonwebtoken");
	const verif = require("../class//Verify");
	//Crea un nuevo Servicio
	app.post('/api/signup',   signup.create);
/*
	//Lista todos los sericios
	app.get('/api/signup', signup.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/signup/:id', signup.findById);

	//Actualiza un servicio por Id 
	app.put('/api/signup/', signup.update);

	//Borra un servicio por Id
	app.delete('/api/signup/:id', signup.delete);	 */
}