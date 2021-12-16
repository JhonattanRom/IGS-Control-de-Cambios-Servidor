const db = require('../config/db.config.js');
const TipoCC = db.Tipos_CC;


exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	TipoCC.create({
		"Nombre_Tipo_CC" : req.body.Nombre_Tipo_CC,
		"Descripcion_Tipo_CC" : req.body.Descripcion_Tipo_CC
	}).then(TipoCCes => {
		//Envia el usurio creado al cliente
		res.json(TipoCCes);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};