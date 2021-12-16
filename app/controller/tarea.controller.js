const db = require('../config/db.config.js');
const Tarea = db.tareas;
const Control = db.controlesCambio;
const Encargado = db.usuarios;
const Comentario = db.comentarios;
const Usuarios = db.usuarios;


exports.findAllPersonal = (req, res) => {
	console.log(req.params);
	Tarea.findAll({
		where: {ID_Encargado : req.params.idPersonal, Id_Control_Cambio: req.params.id},
		include : [
	    { 
	      as: "controles",
	      model: Control, 
	      required: true,
	    },
	    {
	    	as:"encargados",
	    	model: Usuarios,
	    	required: true
	    },
	    {
	    	as: "informadores",
	    	model: Usuarios,
	    	required: true
	    }
	  ]}).then(tarea => {
	  	console.log(tarea);
		res.json(tarea);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
}

exports.completar =(req, res) => {
	console.log(req.params.id, "parametro");
	Tarea.update({
		"Estado_Tarea": true
	}, {where: {ID_Tarea: req.params.id}
  }).then(tarea => {
  	console.log(tarea,"Desde el controller");
  	res.json(tarea);
  }).catch(err => {
  	console.log(err);
    res.status(500).json({msg: "error", details: err});
  })
}


//Encuentra tarea por id
exports.findById = (req , res) => {
	Tarea.findByPk(req.params.id,{
		include : [
	    { 
	      as: "controles",
	      model: Control, 
	      required: true,
	    },
	    {
	    	as:"encargados",
	    	model: Usuarios,
	    	required: true
	    },
	    {
	    	as: "informadores",
	    	model: Usuarios,
	    	required: true
	    }
	  ]}).then(tarea => {
	  	console.log(tarea);
		res.json(tarea);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};

//Actualiza una tarea por id!! 
exports.update = (req, res) => {

	Tarea.update({
		"Nombre_Tarea": req.body.Nombre_Tarea,
		"Descripcion_Tarea": req.body.Descripcion_Tarea,
		"ID_Encargado": req.body.ID_Encargado},
		{where: {ID_Tarea: req.body.ID_Tarea }
	}).then(tarea => {
      // Send All Customers to Client
      res.json(tarea.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};

// Encuentra todas las tareas
exports.findAll = (req, res) => {
  let id = req.params.id;
  console.log(id, "esta es la id");
  console.log(req.params, "este el body");
  Tarea.findAll({
  	where: {Id_Control_Cambio: id },
  	include : [
	    { 
	      as: "controles",
	      model: Control, 
	      required: true,
	    },
	    {
	    	as:"encargados",
	    	model: Usuarios,
	    	required: true
	    },
	    {
	    	as: "informadores",
	    	model: Usuarios,
	    	required: true
	    }
	  ],
  // Add order conditions here....
        order: [
            ['ID_Tarea', 'ASC']
        ]}).then(tareas => {
      // Send All Customers to Client
      res.json(tareas.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};


exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	console.log(req.body, "Este es el body");
	Tarea.create({
		"Nombre_Tarea" : req.body.Nombre_Tarea,
		"Descripcion_Tarea" : req.body.Descripcion_Tarea,
		"Estado_Tarea" : req.body.Estado_Tarea,
		"ID_Encargado" : req.body.ID_Encargado,
		"Id_Control_Cambio" : req.body.Id_Control_Cambio
	}).then(tarea => {
		//Envia el servicio creado al cliente
		res.json(tarea);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};