module.exports = function(app) {
	const comentarios = require('../controller/comentario.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/comentarios', comentarios.create);

	//Lista todos los sericios
	app.get('/api/comentarios/Tarea/:id', comentarios.findAll);
/*
	//Lista todos los sericios
	app.get('/api/comentarios', comentarios.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/comentarios/:id', comentarios.findById);

	//Actualiza un servicio por Id 
	app.put('/api/comentarios/', comentarios.update);
	
	//Alterna el estado del usuario
	app.put("/api/comentarios/alternar/:id", comentarios.Alternar);

	//Borra un servicio por Id
	app.delete('/api/comentarios/:id', comentarios.delete);	 */
}