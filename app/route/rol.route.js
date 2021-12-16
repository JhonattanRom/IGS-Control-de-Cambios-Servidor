module.exports = function(app) {
	const roles = require('../controller/rol.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/roles', roles.create);

	//Lista todos los sericios
	app.get('/api/roles', roles.findAll);
	/*
	//Obtiene un Servicio por Id
	app.get('/api/roles/:id', roles.findById);

	//Actualiza un servicio por Id 
	app.put('/api/roles/', roles.update);

	//Borra un servicio por Id
	app.delete('/api/roles/:id', roles.delete);	 
*/}