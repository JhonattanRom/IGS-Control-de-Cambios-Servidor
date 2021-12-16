module.exports = function(app) {
	const reporte = require('../controller/reporte.controller.js');

	//Lista todos los sericios
	app.post('/api/reporte', reporte.findAll);
	
	
/*
	//Borra un servicio por Id
	app.delete('/api/empresas/:id', empresas.delete);	 */
}