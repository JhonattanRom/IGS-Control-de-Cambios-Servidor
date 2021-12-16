const db = require('../config/db.config.js');
const SucursalControlCambio = db.SucursalControlCambio;
const env = require('../config/env.js');

const Sequelize = require('sequelize');
const sequelize = db.sequelize;

exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	SucursalControlCambio.create({
		"Id_Control_Cambio" : req.body.Id_Control_Cambio,
		"Id_sucursal" : req.body.Id_sucursal,
	}).then(sucursalControlCambio => {
		//Envia el servicio creado al cliente
		res.json(sucursalControlCambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};