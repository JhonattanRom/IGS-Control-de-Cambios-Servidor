const db = require('../config/db.config.js');
const Estatus = db.Estatus;


exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	Estatus.create({
		"Nombre_Estatus" : req.body.Nombre_Estatus,
		"Descripcion_Estatus" : req.body.Descripcion_Estatus
	}).then(Estatus => {
		//Envia el usurio creado al cliente
		res.json(Estatus);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};