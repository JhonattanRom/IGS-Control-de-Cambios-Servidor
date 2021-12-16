module.exports = function(app) {
    const clientes = require('../controller/cliente.controller.js');
	//Obtiene todos los clientes habilitados
	app.get("/api/clientes/estado/:estado", clientes.ClientesHabilitados);
	
	//Alterna el estado del usuario
	app.put("/api/clientes/alternar/:id", clientes.Alternar);

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