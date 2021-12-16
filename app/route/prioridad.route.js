module.exports = function(app) {
	const prioridades = require('../controller/prioridad.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/prioridades', prioridades.create);

	//Lista todos los sericios
	app.get('/api/prioridades', prioridades.findAll);
	/*
	//Obtiene un Servicio por Id
	app.get('/api/prioridades/:id', prioridades.findById);

	//Actualiza un servicio por Id 
	app.put('/api/prioridades/', prioridades.update);

	//Borra un servicio por Id
	app.delete('/api/prioridades/:id', prioridades.delete);	 
*/}