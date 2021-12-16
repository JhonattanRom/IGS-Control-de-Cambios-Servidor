

module.exports = function(app) {
	const jwt = require("jsonwebtoken");
	const verif = require("../class/Verify");
	const servicios = require('../controller/servicio.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/servicios',servicios.create);

	//Lista todos los sericios
	app.get('/api/servicios',   servicios.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/servicios/:id', servicios.findById);

	//Actualiza un servicio por Id 
	app.put('/api/servicios/', servicios.update);

	//Borra un servicio por Id
	app.delete('/api/servicios/:id', servicios.delete);	 

	//Alterna el estado del servicio
	app.put("/api/servicios/alternar/:id", servicios.Alternar);

}