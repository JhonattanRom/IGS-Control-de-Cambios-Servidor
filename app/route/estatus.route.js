module.exports = function(app) {
	const estatus = require('../controller/estatus.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/estatus', estatus.create);/*

	//Lista todos los sericios
	app.get('/api/estatus', estatus.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/estatus/:id', estatus.findById);

	//Actualiza un servicio por Id 
	app.put('/api/estatus/', estatus.update);

	//Borra un servicio por Id
	app.delete('/api/estatus/:id', estatus.delete);	 
*/}