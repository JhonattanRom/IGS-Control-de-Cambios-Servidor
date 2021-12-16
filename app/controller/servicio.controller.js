const db = require('../config/db.config.js');
const Servicio = db.servicios;






exports.Alternar = (req, res) => {
	let id = req.params.id;
	console.log(id, "Este es el id del servicio");
	console.log(req.body, "Este es el body");
	Servicio.update({
         "Estado_servicio" : req.body.Estado_servicio
	}, {where:{
		Id_servicio_app: id
	}}).then(servicio =>{
		console.log(servicio);
		res.json(servicio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

// FETCH All Customers
exports.findAll = (req, res) => {
	//console.log(TokenDatosPerfil);
  Servicio.findAll({
  // Add order conditions here....
        order: [
            ['Id_servicio_app', 'ASC'],
        ],}).then(servicios => {
      // Send All Customers to Client
      res.json(servicios.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};

/*

//ta mal
//Busca todos los Servicios en la BD
exports.update = ( req, res ) => {
	Servicio.findAll().then(servicios => {
	 //Envia los servicios encontrados al cliente y los ordena
	 res.json(servicios.sort(function(c1,c2){return c1.Id_servicio_app - c2.Id_servicio_app}));
	}).catch(err => {
		console.log(err);
		res.status(500), json({msg: 'error', details: err});	
	});
};
*/
/*
//ta mal
//Encuentra un servicio por el Id. 
exports.findById = ( req, res ) =>{
	const id = req.body.id;
	Servicio.update(req.body, 
	    { where:{ id: id } }).then(() => {
	    	res.status(200).json({mgs: "Updated Successfully -> Servicio Id = " + id});
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};
*/
//Borrar un servicio por id
exports.delete = ( req , res ) => {
	const id = req.params.id;
	Servicio.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({msg: "Se elimino el servicio correctamente"});
	})
};


//FindByID(Nuevo)
exports.findById = (req , res) => {
	Servicio.findByPk(req.params.id).then(servicio => {
		res.json(servicio);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};


//Update Service (Nuevo)
exports.update = ( req, res ) => {
	const id = req.body.Id_servicio_app; 
	console.log("Este es el id:",id);
	Servicio.update( req.body,
              {where: {Id_servicio_app: id } }).then(() => {
              	res.status(200).json( { mgs: "Update Successfully -> Servicio Id = " + id});
              }).catch(err => {
              	console.log(err);
              	res.status(500).json( {msg: "error", details: err});
              });
};

exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	//console.log(TokenDatosPerfil);
	Servicio.create({
		"Nombre_servicio" : req.body.Nombre_servicio,
		"Descripcion_servicio" : req.body.Descripcion_servicio,
		"Estado_servicio" : req.body.Estado_servicio,
	}).then(servicios => {
		//Envia el servicio creado al cliente
		res.json(servicios);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};