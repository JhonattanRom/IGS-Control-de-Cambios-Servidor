const db = require('../config/db.config.js');
const Usuario = db.usuarios;
const jwt = require("jsonwebtoken");
//PARA EL LOGIN SE CREA UN TOKEN
//NO SE PIDE UN TOKEN

exports.Login = async ( req, res ) => {
	//Verify();
	//Guarda en la bd de Postgresql
	
	const {Correo_Usuario, Password_Usuario} = req.body;
	//console.log(req.body.Password_Usuario, "Contra del controller");
	 await Usuario.findOne({ where: {Correo_Usuario: Correo_Usuario} })
		.then( async usuario => {

			if (!usuario) return res.status(401).send("Correo de usuario incorrecto");
			if (usuario.Password_Usuario !== Password_Usuario) return  res.status(401).send("Clave incorrecta");
			//res.json(usuario);
		const 	token = await jwt.sign({Id_Usuario: usuario.Id_Usuario,
									Cedula_Usuario: usuario.Cedula_Usuario,
									Nombre_Usuario: usuario.Nombre_Usuario,
									Id_Cargo_Usuario: usuario.Id_Cargo_Usuario,
									Id_Rol_Usuario: usuario.Id_Rol_Usuario,
									Correo_Usuario: usuario.Correo_Usuario,
								    Password_Usuario: usuario.Password_Usuario,
								    Estado_Usuario: usuario.Estado_Usuario }, "SecretKey");
			//await localStorage.setItem("token", res.token);
			res.json({token});
			console.log({token}, "Esto es el token");
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error ", details : err})
		})
};
/*

{
    "Correo_Usuario": "Kollon02@gmail.com",
    "Password_Usuario": "MiContraseña"
}*/
