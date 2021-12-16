module.exports = function(app) {
	const usuarios = require('../controller/usuario.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/usuarios', usuarios.create);

	//Lista todos los sericios
	app.get('/api/usuarios', usuarios.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/usuarios/:id', usuarios.findById);

	//Obtiene todos los usuarios habilitados
	app.get("/api/usuarios/estado/:estado", usuarios.UserHabilitados);

	//Alterna el estado del usuario
	app.put("/api/usuarios/alternar/:id", usuarios.Alternar);

	//Actualiza un servicio por Id 
	app.put('/api/usuarios/', usuarios.update);

	//Consigue los datos del usuario
	app.post("/api/usuarios/perfil", usuarios.PerfilUsuario)
/*
	//Borra un servicio por Id
	app.delete('/api/usuarios/:id', usuarios.delete);	 
*/}