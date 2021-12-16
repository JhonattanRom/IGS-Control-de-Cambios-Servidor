module.exports = function(app) {
	const empresas = require('../controller/empresa.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/empresas', empresas.create);

	//Lista todos los sericios
	app.get('/api/empresas', empresas.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/empresas/:id', empresas.findById);

	//Actualiza una Empresa
	app.put('/api/empresas/', empresas.update);

	//Borra un servicio por Id
	app.delete('/api/empresas/:id', empresas.delete);	 
}