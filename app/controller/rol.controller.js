const db = require('../config/db.config.js');
const Rol = db.roles;


exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	Rol.create({
		"Nombre_Rol" : req.body.Nombre_Rol,
		"Descripcion_Rol" : req.body.Descripcion_Rol
	}).then(roles => {
		//Envia el usurio creado al cliente
		res.json(roles);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};

// FETCH All Customers
exports.findAll = (req, res) => {
  Rol.findAll().then(rol => {
      // Send All empresas to Client
      res.json(rol.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};