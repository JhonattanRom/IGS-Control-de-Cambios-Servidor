module.exports = function(app) {
	const SucursalControlCambio = require('../controller/SucursalControlCambio.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/SucursalControlCambio', SucursalControlCambio.create);
	
/*
	//Lista todos los sericios
	app.get('/api/SucursalControlCambio', SucursalControlCambio.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/SucursalControlCambio/:id', SucursalControlCambio.findById);

	//Actualiza un servicio por Id 
	app.put('/api/SucursalControlCambio/', SucursalControlCambio.update);

	//Borra un servicio por Id
	app.delete('/api/SucursalControlCambio/:id', SucursalControlCambio.delete);	 */
}