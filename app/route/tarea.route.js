module.exports = function(app) {
	const tareas = require('../controller/tarea.controller.js');

	//Crea un nuevo tarea
	app.post('/api/tareas', tareas.create);
    
    //Lista todos los tareas
	app.get('/api/tareas/ControlCambio/:id', tareas.findAll);

	//Listar tareas personales
	app.get("/api/tareas/ControlCambio/:idPersonal/:id", tareas.findAllPersonal)

	//Actualiza un servicio por Id 
	app.put('/api/tareas/', tareas.update);

	//Obtiene una tarea por id
	app.get('/api/tareas/:id', tareas.findById);

	//Completa las tareas por id
	app.put("/api/tareas/completar/:id", tareas.completar);


/*
	//Obtiene un Servicio por Id
	app.get('/api/tareas/:id', tareas.findById);

	
	
	//Alterna el estado del usuario
	app.put("/api/tareas/alternar/:id", tareas.Alternar);

	//Borra un servicio por Id
	app.delete('/api/tareas/:id', tareas.delete);	*/ 
}