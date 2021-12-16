module.exports = function(app) {
	const cargos = require('../controller/cargo.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/cargos', cargos.create);

	//Lista todos los sericios
	app.get('/api/cargos', cargos.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/cargos/:id', cargos.findById);

	//Actualiza un servicio por Id 
	app.put('/api/cargos/', cargos.update);
	
	//Alterna el estado del usuario
	app.put("/api/cargos/alternar/:id", cargos.Alternar);

	//Borra un servicio por Id
	app.delete('/api/cargos/:id', cargos.delete);	 
}