const db = require('../config/db.config.js');
const Prioridad = db.prioridades;


exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	Prioridad.create({
		"Nombre_Prioridad" : req.body.Nombre_Prioridad,
		"Descripcion_Prioridad" : req.body.Descripcion_Prioridad
	}).then(Prioridades => {
		//Envia el usurio creado al cliente
		res.json(Prioridades);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};

// FETCH All Customers
exports.findAll = (req, res) => {
  Prioridad.findAll().then(prioridad => {
      // Send All empresas to Client
      res.json(prioridad.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};