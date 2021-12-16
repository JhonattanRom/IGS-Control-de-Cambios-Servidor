module.exports = function(app) {
	const tiposCC = require('../controller/tipoCC.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/tiposCC', tiposCC.create);/*

	//Lista todos los sericios
	app.get('/api/tiposCC', tiposCC.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/tiposCC/:id', tiposCC.findById);

	//Actualiza un servicio por Id 
	app.put('/api/tiposCC/', tiposCC.update);

	//Borra un servicio por Id
	app.delete('/api/tiposCC/:id', tiposCC.delete);	 
*/}