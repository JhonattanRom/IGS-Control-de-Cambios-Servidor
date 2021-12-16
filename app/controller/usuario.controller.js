const db = require('../config/db.config.js');
const Usuario = db.usuarios;
const Rol = db.roles;
const Cargo = db.cargos;
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');

exports.PerfilUsuario = async (req, res) => {
	console.log(req.body, "Test12");
	console.log(req.body.Id_Usuario);
var queryPerfil = `Select "Cedula_Usuario" as "Cedula", 
"Nombre_Usuario" as "Nombre", 
"Apellido_Usuario" as "Apellido", 
"Correo_Usuario" as "Correo", 
"Cargos"."Nombre_cargo" as "Cargo", 
"Rol"."Nombre_Rol" as "Rol"
from "Tb_Usuario" inner join "Tb_Tipo_Cargo" 
as "Cargos" on "Tb_Usuario"."Id_Cargo_Usuario" = "Cargos"."Id_tipo_cargo"
inner join "Tb_Rol" as "Rol" on "Tb_Usuario"."Id_Rol_Usuario" = "Rol"."Id_Rol" where "Tb_Usuario"."Id_Usuario" =  ${req.body.Id_Usuario}`;

Tb_Usuario = await sequelize.query(
	  queryPerfil,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    type: QueryTypes.SELECT
	  }).then(Usuarios => {
		//Envia el usurio creado al cliente
        //main(EmailArray, ControlCambio);
        console.log(Usuarios);
        res.json(Usuarios);
	}).catch(err => {
		console.log(err);
	});
};

//Update cargo (Nuevo)
exports.update = ( req, res ) => {
	const id = req.body.Id_Usuario;
	console.log(req.body, "Este es el body"); 
	console.log("Este es el id:",id);
	Usuario.update( req.body,
              {where: {Id_Usuario: id } }).then(() => {
              	res.status(200).json( { mgs: "Update Successfully -> Usuario Id = " + id});
              }).catch(err => {
              	console.log(err);
              	res.status(500).json( {msg: "error", details: err});
              });
};

exports.Alternar = (req, res) => {
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


exports.UserHabilitados = (req, res ) => {
	let Estado = req.params.estado;
	Usuario.findAll({
	  where: {
	  	Estado_Usuario: Estado
	  },
	  include : [
	    { 
	      as: "roles",	
	      model: Rol, 
	      required: true,
	    },
	    { 
	      as: "cargos",
	      model: Cargo, 
	      required: true,
	    }
	  ]
	 
	}).then(usuarios => {
		//Envia el usurio creado al cliente
		res.json(usuarios);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}



exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	Usuario.create({
		"Cedula_Usuario" : req.body.Cedula_Usuario,
		"Nombre_Usuario" : req.body.Nombre_Usuario,
		"Apellido_Usuario" : req.body.Apellido_Usuario,
		"Id_Cargo_Usuario" : req.body.Id_Cargo_Usuario,
		"Id_Rol_Usuario" : req.body.Id_Rol_Usuario,
		"Correo_Usuario" : req.body.Correo_Usuario,
		"Password_Usuario" : req.body.Password_Usuario,
		"Estado_Usuario" : req.body.Estado_Usuario,
	}).then(usuarios => {
		//Envia el usurio creado al cliente
		res.json(usuarios);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};

/*
// FETCH All Customers
exports.findAll = (req, res) => {
  Usuario.findAll().then(usuarios => {
      // Send All Customers to Client
      res.json(usuarios.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};*/

exports.findAll = (req, res) =>{
	Usuario.findAll({
	  include : [
	    { 
	      as: "roles",	
	      model: Rol, 
	      required: true,
	    },
	    { 
	      as: "cargos",
	      model: Cargo, 
	      required: true,
	    }
	  ],// Add order conditions here....
        order: [
            ['Id_Usuario', 'ASC'],
        ],
	}).then(usuarios => {
		res.json(usuarios);
		//res.json(usuarios.sort(function(c1, c2){return c1.id - c2.id}));
	}).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};

//FindByID(Nuevo)
exports.findById = (req , res) => {
	Usuario.findByPk(req.params.id).then(usuario => {
		res.json(usuario);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};

	//include: [{model: Cargo, required: true }]
	//
/*	Executing (default): SELECT "Tb_Usuario"."Id_Usuario", "Tb_Usuario"."Cedula_Usuario", "Tb_Usuario"."Nombre_Usuario", "Tb_Usuario"."Apellido_Usuario",
	 "Tb_Usuario"."Id_Cargo_Usuario", "Tb_Usuario"."Id_Rol_Usuario", "Tb_Usuario"."Correo_Usuario", "Tb_Usuario"."Password_Usuario", "Tb_Usuario"."Estado_Usuario",
	  "Tb_Usuario"."createdAt", "Tb_Usuario"."updatedAt", "roles"."Id_Rol" AS "roles.Id_Rol", "roles"."Nombre_Rol" AS "roles.Nombre_Rol", 
	  "roles"."Descripcion_Rol" AS "roles.Descripcion_Rol", "roles"."createdAt" AS "roles.createdAt", "roles"."updatedAt" AS "roles.updatedAt", 
	  "cargos"."Id_tipo_cargo" AS "cargos.Id_tipo_cargo", "cargos"."Nombre_cargo" AS "cargos.Nombre_cargo", 
	  "cargos"."Descripcion_cargo" AS "cargos.Descripcion_cargo", "cargos"."Estado_cargo" AS "cargos.Estado_cargo",
	   "cargos"."createdAt" AS "cargos.createdAt", "cargos"."updatedAt" AS "cargos.updatedAt" FROM "Tb_Usuario" AS "Tb_Usuario" INNER JOIN 
	   "Tb_Rol" AS "roles" ON "Tb_Usuario"."Id_Rol_Usuario" = "roles"."Id_Rol" INNER JOIN "Tb_Tipo_Cargo" AS "cargos" ON "Tb_Usuario"."Id_Cargo_Usuario" = "cargos"."Id_tipo_cargo";*/