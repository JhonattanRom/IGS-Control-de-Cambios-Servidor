const db = require('../config/db.config.js');
const Sucursales = db.sucursales;
const Empresas = db.empresas;

const env = require('../config/env.js');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;

exports.Alternar = (req, res) => {
	let id = req.params.id;
	console.log(req.body, "Este es el body del cliente!!!");
	return sequelize.transaction( (t) => {
  		return Empresas.update({
    		"Estado_empresa" : req.body.Estado_empresa
  		}, {where:{Id_Empresa: id}}, 
  		   {transaction: t}).then( (empresa) => {
    		return Sucursales.update({
      		"Estado_sucursal" : req.body.Estado_empresa
    		}, {where:{Id_empresa: id}}, 
    		{transaction: t});
  			});
	}).then( (result) =>{
 		res.json(result);
		}).catch( (err) => {
  		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}



exports.hlis = (req, res) => {
	let id = req.params.id;
	console.log(id, "Este es el id del usuario");
	console.log(req.body, "Este es el body");
	Usuario.update({
         "Estado_Usuario" : req.body.Estado_Usuario
	}, {where:{
		Id_Usuario: id
	}}).then(usuario =>{
		console.log(usuario);
		res.json(usuario);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}


exports.ClientesHabilitados = (req, res ) => {
	let Estado = req.params.estado;
	Sucursales.findAll({
	  where: {
	  	Estado_sucursal: Estado
	  },
	  include : [
	    { 
	      as: "empresas",	
	      model: Empresas, 
	      required: true,
	    }
	  ]
	 
	}).then(clientes => {
		//Envia el usurio creado al cliente
		res.json(clientes);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}
