module.exports = function(app) {
	const signin = require('../controller/signin.controller.js');
	const jwt = require("jsonwebtoken");
	const verif = require("../class/Verify");
	//Crea un nuevo Servicio
	app.post('/api/signin',  signin.Login);

	/*
	app.get("/api/private", Verify, (req, res) => {
		res.json([{
			id: 1 ,
			tarea: "Comer"
		}]);
	})*/
/*
	//Lista todos los sericios
	app.get('/api/signin', signin.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/signin/:id', signin.findById);

	//Actualiza un servicio por Id 
	app.put('/api/signin/', signin.update);

	//Borra un servicio por Id
	app.delete('/api/signin/:id', signin.delete);	 */

	function Verify(req, res, next){
	//console.log(req.headers.authorizations);

	if (!req.headers.authorization) {

		return res.status(401).send("Unthorize request");
	}
	const token = req.headers.authorization.split(" ")[1];
	if (token === "null") {
		console.log("Hola error");
		return res.status(401).send("Hola error");
	}
	const payLoad = jwt.verify(token, "SecretKey");
	console.log(payLoad, "ESTO DESDE LA FUNCION VERIFYS");

	//Cuidado con esto!!! 
	/*
	req.body.Id_Usuario = payLoad.Id_Usuario;
	req.body.Cedula_Usuario = payLoad.Cedula_Usuario;
	req.body.Nombre_Usuario = payLoad.Nombre_Usuario;
	req.body.Id_Cargo_Usuario = payLoad.Id_Cargo_Usuario;
	req.body.Id_Rol_Usuario = payLoad.Id_Rol_Usuario;
	req.body.Correo_Usuario = payLoad.Correo_Usuario;
	req.body.Password_Usuario = payLoad.Password_Usuario;
	req.body.Estado_Usuario = payLoad.Estado_Usuario;
	*/
    console.log(payLoad.Password_Usuario, "Contra del payload");
	next();
}
}

