const jwt = require("jsonwebtoken");

exports.Verify = (req, res, next) => {
	//console.log(req.headers.authorizations);

	if (!req.headers.Authorization) {
		console.log("Tenemos un problema");
		return res.status(401).send("Unthorize request");
	}
	const token = req.headers.Authorization.split(" ")[1];
	if (token === "null") {
		//console.log("Tenemos un problema");
		return res.status(401).send("Unthorize request");
	}
	const payLoad = jwt.verify(token, "SecretKey");
	console.log(payLoad, "ESTO DESDE LA FUNCION VERIFYS");

	//Cuidado con esto!!!
	TokenDatosPerfil = {};
	TokenDatosPerfil.Id_Usuario = payLoad.Id_Usuario;
	TokenDatosPerfil.Cedula_Usuario = payLoad.Cedula_Usuario;
	TokenDatosPerfil.Nombre_Usuario = payLoad.Nombre_Usuario;
	TokenDatosPerfil.Id_Cargo_Usuario = payLoad.Id_Cargo_Usuario;
	TokenDatosPerfil.Id_Rol_Usuario = payLoad.Id_Rol_Usuario;
	TokenDatosPerfil.Correo_Usuario = payLoad.Correo_Usuario;
	TokenDatosPerfil.Password_Usuario = payLoad.Password_Usuario;
	TokenDatosPerfil.Estado_Usuario = payLoad.Estado_Usuario;
	
 	console.log(TokenDatosPerfil, "TokenRegistrado");
	next();
	/*TokenDatosPerfil.Id_Usuario = payLoad.Id_Usuario;
	TokenDatosPerfil.Cedula_Usuario = payLoad.Cedula_Usuario;
	TokenDatosPerfil.Nombre_Usuario = payLoad.Nombre_Usuario;
	TokenDatosPerfil.Id_Cargo_Usuario = payLoad.Id_Cargo_Usuario;
	TokenDatosPerfil.Id_Rol_Usuario = payLoad.Id_Rol_Usuario;
	TokenDatosPerfil.Correo_Usuario = payLoad.Correo_Usuario;
	TokenDatosPerfil.Password_Usuario = payLoad.Password_Usuario;
	TokenDatosPerfil.Estado_Usuario = payLoad.Estado_Usuario;*/
   
}
/*
exports.Muestra = (req, res, next) => {
	//console.log(req.headers.authorizations);

	if (!req.headers.authorizations) {
		return res.status(401).send("Unthorize request");
	}
	const token = req.headers.authorizations.split(" ")[1];
	
	const payLoad = jwt.verify(token, "SecretKey");
	console.log(payLoad, "ESTO DESDE LA FUNCION VERIFYS");

	//Cuidado con esto!!!
	TokenDatosPerfil = {};
	TokenDatosPerfil.Id_Usuario = payLoad.Id_Usuario;
	TokenDatosPerfil.Cedula_Usuario = payLoad.Cedula_Usuario;
	TokenDatosPerfil.Nombre_Usuario = payLoad.Nombre_Usuario;
	TokenDatosPerfil.Id_Cargo_Usuario = payLoad.Id_Cargo_Usuario;
	TokenDatosPerfil.Id_Rol_Usuario = payLoad.Id_Rol_Usuario;
	TokenDatosPerfil.Correo_Usuario = payLoad.Correo_Usuario;
	TokenDatosPerfil.Password_Usuario = payLoad.Password_Usuario;
	TokenDatosPerfil.Estado_Usuario = payLoad.Estado_Usuario;
	
 	console.log(TokenDatosPerfil, "TokenRegistrado");
	next();
}*/