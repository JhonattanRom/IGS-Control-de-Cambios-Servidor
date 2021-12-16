const db = require('../config/db.config.js');
const Sucursal = db.sucursales;
const Empresa = db.empresas;
const env = require('../config/env.js');

const Sequelize = require('sequelize');
const sequelize = db.sequelize;




//Update Sucursal (Nuevo)
exports.update = ( req, res ) => {
	const id = req.body.Id_sucursal;
	console.log(req.body, "Este es el body"); 
	console.log("Este es el id:",id);
	Sucursal.update( req.body,
              {where: {Id_sucursal: id } }).then(() => {
              	res.status(200).json( { mgs: "Update Successfully -> Sucursal Id = " + id});
              }).catch(err => {
              	console.log(err);
              	res.status(500).json( {msg: "error", details: err});
              });
};


exports.Alternar = (req, res) => {
	let id = req.params.id;
	console.log(id, "Este es el id del usuario");
	console.log(req.body, "Este es el body");
	Sucursal.update({
         "Estado_sucursal" : req.body.Estado_sucursal
	}, {where:{
		Id_sucursal: id
	}}).then(sucursal =>{
		console.log(sucursal);
		res.json(sucursal);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

/*
Sucursal.create({
		"Nombre_sucursal" : req.body.Nombre_sucursal,
		//El id no es estatico
		"Id_empresa" : id,
		"Estado_sucursal" : req.body.Estado_sucursal,
	}, {where:{Id_empresa: id}})

 */

exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	//let id = req.params.id;
	//console.log(req.params.id);
	// console.log(req.body);
	const Sucursales = req.body;
	// console.log(req.body, "Este es el body");
	// console.log(req.body.Nombre_sucursal, "Este e s el nombre de la sucursal");

	Sucursal.bulkCreate(Sucursales).then(sucursal => {
		//Envia el servicio creado al cliente
		res.json(sucursal);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});

};

exports.findAll = (req, res) =>{
	Sucursal.findAll({
	  include : [
	    { 
	      as: "empresas",	
	      model: Empresa, 
	      required: true,
	    }
	  ],// Add order conditions here....
        order: [
            ['Id_sucursal', 'ASC'],
        ],
	}).then(sucursales => {
		//console.log(sucursales, "Desde mi corazon");
		res.json(sucursales.sort(function(c1, c2){return c1.id - c2.id}));
	}).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};

//FindByID(Nuevo)
exports.findById = (req , res) => {
	console.log(req.params.id, "Este es el id");
	Sucursal.findByPk(req.params.id).then(sucursal => {
		res.json(sucursal);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};