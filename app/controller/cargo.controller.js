const db = require('../config/db.config.js');
const Cargo = db.cargos;

exports.Alternar = (req, res) => {
	let id = req.params.id;
	console.log(id, "Este es el id del usuario");
	console.log(req.body, "Este es el body");
	Cargo.update({
         "Estado_cargo" : req.body.Estado_cargo
	}, {where:{
		Id_tipo_cargo: id
	}}).then(cargo =>{
		console.log(cargo);
		res.json(cargo);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}


// FETCH All Customers
exports.findAll = (req, res) => {
  Cargo.findAll({
  // Add order conditions here....
        order: [
            ['Id_tipo_cargo', 'ASC'],
        ]}).then(cargos => {
      // Send All Customers to Client
      res.json(cargos.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};


//Borrar un cargo por id
exports.delete = ( req , res ) => {
	const id = req.params.id;
	Cargo.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({msg: "Se elimino el cargo correctamente"});
	})
};


//FindByID(Nuevo)
exports.findById = (req , res) => {
	
	Cargo.findByPk(req.params.id).then(cargo => {
		res.json(cargo);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};


//Update cargo (Nuevo)
exports.update = ( req, res ) => {
	const id = req.body.Id_tipo_cargo; 
	console.log("Este es el id:",id);
	Cargo.update( req.body,
              {where: {Id_tipo_cargo: id } }).then(() => {
              	res.status(200).json( { mgs: "Update Successfully -> Servicio Id = " + id});
              }).catch(err => {
              	console.log(err);
              	res.status(500).json( {msg: "error", details: err});
              });
};

exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	Cargo.create({
		"Nombre_cargo" : req.body.Nombre_cargo,
		"Descripcion_cargo" : req.body.Descripcion_cargo,
		"Estado_cargo" : req.body.Estado_cargo,
	}).then(cargo => {
		//Envia el servicio creado al cliente
		res.json(cargo);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};