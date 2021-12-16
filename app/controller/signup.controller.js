const db = require('../config/db.config.js');
const Usuario = db.usuarios;
const jwt = require("jsonwebtoken");

//PARA EL REGISTRO SE REQUIERE UN TOKEN
//NO SE CREA UN TOKEN

exports.create = (req, res) => {

//datos de token de usuario traidos desde verify.	
//console.log(TokenDatosPerfil, "Desde el controllador Payload");
Usuario.create({
		"Cedula_Usuario" : req.body.Cedula_Usuario,
		"Nombre_Usuario" : req.body.Nombre_Usuario,
		"Apellido_Usuario" : req.body.Apellido_Usuario,
		"Id_Cargo_Usuario" : req.body.Id_Cargo_Usuario,
		"Id_Rol_Usuario" : req.body.Id_Rol_Usuario,
		"Correo_Usuario" : req.body.Correo_Usuario,
		"Password_Usuario" : req.body.Password_Usuario,
		"Estado_Usuario" : req.body.Estado_Usuario,
	}).then(usuario => {
		//Esto solo esta a modo de prueba!!
		const token = jwt.sign({Id_Usuario: usuario.Id_Usuario,
									Cedula_Usuario: usuario.Cedula_Usuario,
									Nombre_Usuario: usuario.Nombre_Usuario,
									Id_Cargo_Usuario: usuario.Id_Cargo_Usuario,
									Id_Rol_Usuario: usuario.Id_Rol_Usuario,
									Correo_Usuario: usuario.Correo_Usuario,
								    Password_Usuario: usuario.Password_Usuario,
								    Estado_Usuario: usuario.Estado_Usuario }, "SecretKey");
		res.json({token});
		console.log(usuario);
		//res.json(usuario);
		//console.log(usuario, "Desde el controller");
	}).catch(err => {
		console.log(err);
		console.log("El error esta aqui");
		res.status(500).json({msg: "error ", details : err})
	});

	
}


/*

 {	"Cedula_Usuario" : "22.555.333",
   "Nombre_Usuario" : "Jhonattan",
    "Apellido_Usuario" : "Romero",
    "Id_Cargo_Usuario" : 1,
    "Id_Rol_Usuario" : 4,
    "Correo_Usuario" : "Kollon02@gmail.com",
    "Password_Usuario" : "MiContraseña",
    "Estado_Usuario" : true}

 */

/*s	const {	Id_Usuario,
			Cedula_Usuario ,
    		Nombre_Usuario  ,
    		Apellido_Usuario ,
    		Id_Cargo_Usuario ,
    		Id_Rol_Usuario ,
    		Correo_Usuario ,
    		Password_Usuario ,
    		Estado_Usuario } = req.body;
	
const NuevoUsuario = new Usuario({	Id_Usuario,
										Cedula_Usuario ,
	    								Nombre_Usuario  ,
	    								Apellido_Usuario ,
		    							Id_Cargo_Usuario ,
			    						Id_Rol_Usuario ,
			    						Correo_Usuario ,
				    					Password_Usuario ,
			    						Estado_Usuario})
//await Usuario.create(NuevoUsuario);
console.log(NuevoUsuario)*/

/*
{ "Correo_Usuario" : "Nenny212@gmail.com",
    "Password_Usuario" : "Holis"}
 */