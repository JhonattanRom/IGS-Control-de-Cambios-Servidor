module.exports = function(app) {
	const sucursales = require('../controller/sucursal.controller.js');

	//Crea un nuevo sucursal
	app.post('/api/sucursales', sucursales.create);

	//Lista todos los sucursal
	app.get('/api/sucursales', sucursales.findAll);

	//Obtiene un sucursal por Id
	app.get('/api/sucursales/:id', sucursales.findById);

	//Alterna el estado del sucursal
	app.put("/api/sucursales/alternar/:id", sucursales.Alternar);
	
	//Actualiza una sucursal 
	app.put('/api/sucursales/', sucursales.update);
	
/*
	//Actualiza un sucursal por Id 
	app.put('/api/sucursales/', sucursales.update);

	//Borra un sucursal por Id
	app.delete('/api/sucursales/:id', sucursales.delete);
	*/	 
}