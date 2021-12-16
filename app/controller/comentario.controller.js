const db = require('../config/db.config.js');
const Comentario = db.comentarios;
const Encargados = db.usuarios;


exports.findAll = (req, res) => {
	const id = req.params.id;
	console.log(id, "Esta es la id CTM");
	Comentario.findAll({where: {ID_Tarea: id},
	  include : [
	    { 
	      as: "encargados",	
	      model: Encargados, 
	      required: true,
	    }
	  ],// Add order conditions here....
        order: [
            ['Id_Comentario', 'ASC'],
        ]}).then(comentarios => {
		res.json(comentarios);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	})
}

exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	Comentario.create({
		"Comentario" : req.body.Comentario,
		"ID_Tarea" : req.body.ID_Tarea,
		"ID_Encargado": req.body.ID_Encargado
	}).then(comentario => {
		//Envia el servicio creado al cliente
		res.json(comentario);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};

