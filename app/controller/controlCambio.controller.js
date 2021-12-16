const db = require('../config/db.config.js');
const ControlCambio = db.controlesCambio;
const Prioridad = db.prioridades;
const Estatus = db.estatus;
const Servicios = db.servicios;
const Usuarios = db.usuarios;
const ControlCambioSucursal = db.SucursalControlCambio;
const PersonalControlCambio = db.PersonalControlCambio;
const { QueryTypes } = require('sequelize');
var moment = require('moment');

const env = require('../config/env.js');
const Sequelize = require('sequelize');
const sequelize = db.sequelize;
//NodeMailer
const nodemailer = require("nodemailer");
const transporter = require("../config/Mailer.config.js");
//Tips, ..... Creauna funcion para crear un arreglo de objeto 
//     [{id_ControlCambio, id_Clientes/Personal }]
//esto con el objetivo de enviar un Bulkcreate



exports.ActualizarPlanificacion = (req,res) => {
	console.log(req.body);
	console.og(req.params);
}


exports.Ejecutar = (req, res)=> {
	console.log(req.body, "Este es el body amigo!! Evaluacion");
	return ControlCambio.update({
	 "Estatus_Control_Cambio": req.body.Estatus_Control_Cambio,
	},{where: {"Id_Control_Cambio" : req.body.Id_Control_Cambio}}).then(ejecucion => {
		res.json(ejecucion);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

exports.FinalizarCambio = (req, res) => {
	console.log(req.body, "Este es el body amigo!! Evaluacion");
	return ControlCambio.update({
	 "Estatus_Control_Cambio": req.body.Estatus_Control_Cambio,
	 "Id_verificador": req.body.Id_verificador
	},{where: {"Id_Control_Cambio" : req.body.Id_Control_Cambio}}).then(verificacion => {
		res.json(verificacion);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}


exports.EvaluarCambio = (req, res) => {
	console.log(req.body, "Este es el body amigo!! Evaluacion");
	return ControlCambio.update({
	 "Estatus_Control_Cambio": req.body.Estatus_Control_Cambio,
	 "Id_evaluador": req.body.Id_Evaluador
	},{where: {"Id_Control_Cambio" : req.body.Id_Control_Cambio}}).then(evaluacion => {
		res.json(evaluacion);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

//Update cargo (Nuevo)
exports.update = ( req, res ) => {
	const id = req.body.Id_Control_Cambio; 
	console.log("Este es el id:",id);
	ControlCambio.update( req.body,
              {where: {Id_Control_Cambio: id } }).then(() => {
              	res.status(200).json( { mgs: "Update Successfully -> Servicio Id = " + id});
              }).catch(err => {
              	console.log(err);
              	res.status(500).json( {msg: "error", details: err});
              });
};

//FindByID(Nuevo)
exports.findById = (req , res) => {
	ControlCambio.findByPk(req.params.id).then(control => {
		res.json(control);
		console.log(control);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};


exports.create = ( req, res ) => {
	//Guarda en la bd de Postgresql
	ControlCambio.create({
		"Id_solicitante" : req.body.Id_solicitante,
		"Id_evaluador" : req.body.Id_evaluador,
		"Id_verificador" : req.body.Id_verificador,
		"Id_administrador" : req.body.Id_administrador,
		"Id_responsable" : req.body.Id_responsable,
		"Id_servicio" : req.body.Id_servicio,
		"Descripcion_Control_Cambio" : req.body.Descripcion_Control_Cambio,
		"Nombre_Control_Cambio" : req.body.Nombre_Control_Cambio,
		"Estatus_Control_Cambio" : req.body.Estatus_Control_Cambio,
		"Fecha_Solicitud" : req.body.Fecha_Solicitud,
		"Fecha_Inicio" : req.body.Fecha_Inicio,
		"Fecha_Final" : req.body.Fecha_Final,
		"Fecha_Verificacion" : req.body.Fecha_Verificacion,
		"Estado_cargo" : req.body.Estado_cargo,
		"Prioridad_CC" : req.body.Prioridad_CC,
	}).then(controles => {
		//Envia el usurio creado al cliente
		res.json(controles);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
};


exports.findAll = (req, res) =>{
	ControlCambio.findAll({
	  include : [
	    { 
	      as: "prioridad",	
	      model: Prioridad, 
	      required: true,
	    },{ 
	      as: "estatus",	
	      model: Estatus, 
	      required: true,
	    },{ 
	      as: "servicios",	
	      model: Servicios, 
	      required: true,
	    },{ 
	      as: "responsable",	
	      model: Usuarios, 
	      required: false,
	    },{ 
	      as: "administrador",	
	      model: Usuarios, 
	      required: false,
	    },{ 
	      as: "evaluador",	
	      model: Usuarios, 
	      required: false,
	    },{ 
	      as: "verificador",	
	      model: Usuarios, 
	      required: false,
	    },{ 
	      as: "solicitante",	
	      model: Usuarios, 
	      required: false,
	    }
	  ],// Add order conditions here....
        order: [
            ['Id_Control_Cambio', 'ASC'],
        ],
	}).then(controles => {
		//console.log(controles, "Desde mi corazon");
		res.json(controles.sort(function(c1, c2){return c1.id - c2.id}));
	}).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};

exports.CcPresentYear = async(req, res) =>{
	var Query = 'SELECT COUNT (*) AS contador,  extract(Month from "Fecha_Solicitud") AS mes FROM public."Tb_Control_Cambio" WHERE extract(year from "Fecha_Solicitud") = extract(year from NOW()::date) GROUP BY mes ORDER BY mes ASC;'
	console.log(Query, "Esta es la query!!");	
	Tb_Control_Cambio = await sequelize.query(
	  Query,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    replacements: { status:  [req.body.Personal], 
				    	rol:     [req.body.RolCC], 
				    	personal:[req.body.Personal],
				        fechas:  [req.body.fechaInicioCtrl, req.body.fechaInicioCtrl]
				    },
	    type: QueryTypes.SELECT
	  }).then(Tb_Control_Cambio => {
		//Envia el usurio creado al cliente
		console.log(Tb_Control_Cambio, "Resultado Present Year");
		res.json(Tb_Control_Cambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

exports.CcLastYear = async(req, res) =>{
	console.log(req.body, "La fecha");
	var Query = 'SELECT COUNT (*) AS contador, extract(Month from "Fecha_Solicitud") AS mes FROM public."Tb_Control_Cambio" WHERE extract(year from "Fecha_Solicitud") ' + '='+ req.body.LastYear  +   'GROUP BY mes ORDER BY mes ASC';


	console.log(Query, "Esta es la query!!");	
	Tb_Control_Cambio = await sequelize.query(
	  Query,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    replacements: { status:  [req.body.Personal], 
				    	rol:     [req.body.RolCC], 
				    	personal:[req.body.Personal],
				        fechas:  [req.body.fechaInicioCtrl, req.body.fechaInicioCtrl]
				    },
	    type: QueryTypes.SELECT
	  }).then(Tb_Control_Cambio => {
		//Envia el usurio creado al cliente
		console.log(Tb_Control_Cambio, "Resultado LastYear");
		res.json(Tb_Control_Cambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}


exports.CCserviciosSolicitados = async(req, res) =>{
	console.log(req.body, "La fecha");
	var Query = 'SELECT COUNT (*) AS contador, "servicios"."Id_servicio_app" AS "servicios.Id_servicio_app", "servicios"."Nombre_servicio" AS "servicios.Nombre_servicio"FROM "Tb_Control_Cambio" INNER JOIN "Tb_Servicio_App" AS "servicios" ON "Tb_Control_Cambio"."Id_servicio" = "servicios"."Id_servicio_app" Group BY "servicios"."Id_servicio_app" ORDER BY contador DESC LIMIT 5';
	console.log(Query, "Esta es la query!!");	
	Tb_Control_Cambio = await sequelize.query(
	  Query,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    replacements: { status:  [req.body.Personal], 
				    	rol:     [req.body.RolCC], 
				    	personal:[req.body.Personal],
				        fechas:  [req.body.fechaInicioCtrl, req.body.fechaInicioCtrl]
				    },
	    type: QueryTypes.SELECT
	  }).then(Tb_Control_Cambio => {
		//Envia el usurio creado al cliente
		console.log(Tb_Control_Cambio, "Resultado LastYear");
		res.json(Tb_Control_Cambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

exports.CCprioridades = async(req, res) =>{
	var Query = 'Select Count (*) As contador, "prioridades"."Id_prioridad" As "prioridades.Id_Prioridad", "prioridades"."Nombre_Prioridad" As "prioridades.Nombre" from "Tb_Control_Cambio" inner join "Tb_Prioridad_Control_Cambio" as "prioridades" on "Tb_Control_Cambio"."Prioridad_CC" = "prioridades"."Id_prioridad" Group BY "prioridades"."Id_prioridad" ORDER BY contador DESC';
	console.log(Query, "Esta es la query!!");	
	Tb_Control_Cambio = await sequelize.query(
	  Query,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    replacements: { status:  [req.body.Personal], 
				    	rol:     [req.body.RolCC], 
				    	personal:[req.body.Personal],
				        fechas:  [req.body.fechaInicioCtrl, req.body.fechaInicioCtrl]
				    },
	    type: QueryTypes.SELECT
	  }).then(Tb_Control_Cambio => {
		//Envia el usurio creado al cliente
		console.log(Tb_Control_Cambio, "Resultado LastYear");
		res.json(Tb_Control_Cambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}
exports.CCcontadores = async(req, res) =>{
	var Query = 'Select Count  (*) As Contador, "estatus"."Id_Estatus" AS "ID_Prioridad", "estatus"."Nombre_Estatus" AS "Nombre_Estatus" From "Tb_Control_Cambio" inner join "Tb_Estatus_Control_Cambio" as "estatus" on "Tb_Control_Cambio"."Estatus_Control_Cambio" =  "estatus"."Id_Estatus" Group BY "Estatus_Control_Cambio", "estatus"."Id_Estatus" ORDER BY "Estatus_Control_Cambio" ASC';
	console.log(Query, "Esta es la query!!");	
	Tb_Control_Cambio = await sequelize.query(
	  Query,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    replacements: { status:  [req.body.Personal], 
				    	rol:     [req.body.RolCC], 
				    	personal:[req.body.Personal],
				        fechas:  [req.body.fechaInicioCtrl, req.body.fechaInicioCtrl]
				    },
	    type: QueryTypes.SELECT
	  }).then(Tb_Control_Cambio => {
		//Envia el usurio creado al cliente
		console.log(Tb_Control_Cambio, "Resultado LastYear");
		res.json(Tb_Control_Cambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
}

exports.updatePlanificacion = (req, res) => {

var cliente = {"Id_Control_Cambio" : req.params.id,"Id_sucursal": req.body.Clientes};
var equipo = {"Id_Control_Cambio" : req.params.id,"Id_Usuario": req.body.Equipo};
console.log(req.body.Clientes, "Este es el array de Clientes solo");
Cliente =[]; Equipo = [];
req.body.Clientes.forEach((item, index) => {
	Cliente.push({
		"Id_Control_Cambio":req.params.id,
		"Id_sucursal":req.body.Clientes[index]
	})
});
req.body.Equipo.forEach((item, index) => {
	Equipo.push({
		"Id_Control_Cambio":req.params.id,
		"Id_Usuario":req.body.Equipo[index]
	})
});
//console.log(Cliente, "Esto es el arrray detallado");

//Inicio de transaction
return sequelize.transaction(t => {
//Paso 1. Realiza update a la tabla de control de cambios
return ControlCambio.update({ 
                           "Id_responsable": req.body.Id_responsable,
                           "Fecha_Inicio": req.body.Fecha_Inicio,
                           "Fecha_Final": req.body.Fecha_Final,
                           "Id_administrador" : req.body.Id_administrador,
                           "Estatus_Control_Cambio": 5
},{where: {"Id_Control_Cambio" : req.params.id}},
//Paso 2. Se raaliza el insert a la tabla pivote de personal
 {transaction: t}).then(control => {
	//Se crea con un BulkyCreate el registro del personal
	console.log(req.params.id , "Este es el control de cambio desde transaccion");
	//console.log(cliente, "Clientas");
	return ControlCambioSucursal.bulkCreate(Cliente, 
	                                        {fields :["Id_Control_Cambio",'Id_sucursal']},
											{transaction: t}).then(Clientes => {
											return PersonalControlCambio.bulkCreate(Equipo,{fields:[ "Id_Control_Cambio", "Id_Usuario"]},
                                        {transaction: t});
										})
})
}).then(control => {
	console.log(control, "Antes!");
	GetGeneralDataMail(req.params.id);
	res.status(200).json( { mgs: "Update Successfully -> Servicio Id = " + req.params.id});



}).catch(err => {
	console.log(err);
			res.status(500).json({msg: "error ", details : err})
});
};

//Envio de correos
GetGeneralDataMail = async(Id) =>{
var EmailArray = [];
console.log(Id, "Esta es la id del control de cambio");
var Query = `Select "Tb_Control_Cambio"."Nombre_Control_Cambio","Tb_Control_Cambio"."Descripcion_Control_Cambio",
	   "Tb_Control_Cambio"."Fecha_Inicio","Tb_Control_Cambio"."Fecha_Final",
	   "Tb_Control_Cambio"."Id_Control_Cambio","Tb_Control_Cambio"."Id_solicitante" AS "ID_Solicitante",
       "Solicitante"."Correo_Usuario" AS "Correo_Solicitante", "Solicitante"."Nombre_Usuario" AS "Nombre_Solicitante",
	   "Solicitante"."Apellido_Usuario" AS "Apellido_Solicitante", "Solicitante"."Cedula_Usuario" AS "Cedula_Solicitante",
	   "Tb_Control_Cambio"."Id_evaluador" AS "Id_Evaluador","Evaluador"."Correo_Usuario" AS "Correo_Evaluador",
	   "Evaluador"."Nombre_Usuario" AS "Nombre_Evaluador","Evaluador"."Apellido_Usuario" AS "Apellido_Evaluador",
	   "Evaluador"."Cedula_Usuario" AS "Cedula_Evaluador","Responsable"."Correo_Usuario" AS "Correo_Responsable",
	   "Responsable"."Nombre_Usuario" AS "Nombre_Responsable","Responsable"."Apellido_Usuario" AS "Apellido_Responsable",
	   "Responsable"."Cedula_Usuario" AS "Cedula_Responsable","Planificador"."Correo_Usuario" AS "Correo_Planificador",
	   "Planificador"."Nombre_Usuario" AS "Nombre_Planificador","Planificador"."Apellido_Usuario" AS "Apellido_Planificador",
	   "Planificador"."Cedula_Usuario" AS "Cedula_Planificador",
	   "Servicio","Id_servicio_app" As "Id_Servicio",
	   "Servicio"."Nombre_servicio" AS "Nombre_Servicio"from "Tb_Control_Cambio"
	    inner join "Tb_Usuario" as "Planificador" on  "Tb_Control_Cambio"."Id_solicitante" = "Planificador"."Id_Usuario"
	    inner join "Tb_Usuario" as "Solicitante" on "Tb_Control_Cambio"."Id_solicitante" = "Solicitante"."Id_Usuario"
		inner join "Tb_Usuario" as "Evaluador" on "Tb_Control_Cambio"."Id_evaluador" = "Evaluador"."Id_Usuario"
		inner join "Tb_Usuario" as "Responsable" on "Tb_Control_Cambio"."Id_responsable" = "Responsable"."Id_Usuario"
		inner join "Tb_Servicio_App" as "Servicio" on "Tb_Control_Cambio"."Id_servicio" = "Servicio"."Id_servicio_app"
		where ` + ` "Tb_Control_Cambio"."Id_Control_Cambio"  = '${Id}' `;
    Tb_Control_Cambio = await sequelize.query(
	  Query,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    type: QueryTypes.SELECT
	  }).then(ControlCambio => {
		//Envia el usurio creado al cliente
		console.log(ControlCambio, "Listado CC");
		EmailArray = [ControlCambio[0].Correo_Solicitante,
		              ControlCambio[0].Correo_Evaluador,
		              ControlCambio[0].Correo_Responsable,
		              ControlCambio[0].Correo_Planificador ];
		console.log(EmailArray, "Listado de correos");
        //main(EmailArray, ControlCambio);
        GetClienteDataMail(Id, EmailArray,ControlCambio);
	}).catch(err => {
		console.log(err);
	});
}

GetClienteDataMail = async(Id, EmailArray, ControlCambio ) =>{
	var ClientQuery = `select "Sucursal"."Nombre_sucursal" AS "Nombre_Sucursal", "Empresa"."Nombre_empresa" AS "Nombre_Empresa"
from "Tb_Sucursal_Control_Cambio" 
inner join "Tb_Sucursal" as "Sucursal" on "Tb_Sucursal_Control_Cambio"."Id_sucursal" = "Sucursal"."Id_sucursal"
inner join "Tb_Empresa" as "Empresa" on "Sucursal"."Id_empresa" =  "Empresa"."Id_Empresa" where  "Tb_Sucursal_Control_Cambio"."Id_Control_Cambio"  = ${Id}`;
Tb_sucursal_Control_Cambio = await sequelize.query(
	  ClientQuery,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    type: QueryTypes.SELECT
	  }).then(ClienteCC => {
		//Envia el usurio creado al cliente
		console.log(ClienteCC, "Listado del Clientes");
        GetTeamDataMail(Id, EmailArray, ControlCambio, ClienteCC);
	}).catch(err => {
		console.log(err);
	});

}

GetTeamDataMail = async(Id, EmailArray, ControlCambio, ClienteCC ) =>{
  var QueryTeam = `Select "Personal"."Correo_Usuario" AS "Correo_Personal",
	   "Personal"."Nombre_Usuario" AS "Nombre_Personal","Personal"."Apellido_Usuario" AS "Apellido_Personal",
	   "Personal"."Cedula_Usuario" AS "Cedula_Personal"  from "Tb_Personal_Control_Cambio"
	   inner join "Tb_Usuario" as "Personal" on  "Tb_Personal_Control_Cambio"."Id_Usuario" = "Personal"."Id_Usuario" where "Tb_Personal_Control_Cambio"."Id_Control_Cambio" = ${Id}
   `;
   Tb_Personal_Control_Cambio = await sequelize.query(
	  QueryTeam,
	  {
	  	plain: false,
	  	//bind: [req.body.Personal],
	    type: QueryTypes.SELECT
	  }).then(TeamDataCC => {
		//Envia el usurio creado al cliente
		console.log(TeamDataCC, "Listado del Team");
		/*EmailArray = [ControlCambio[0].Correo_Solicitante,
		              ControlCambio[0].Correo_Evaluador,
		              ControlCambio[0].Correo_Responsabler ];*/
		//console.log(EmailArray, "Listado de correos");
        main(EmailArray, ControlCambio, TeamDataCC, ClienteCC);
	}).catch(err => {
		console.log(err);
	});
}



`
[ { Nombre_Control_Cambio: 'Cambio de Cableado PCA',
    Descripcion_Control_Cambio: 'Cambio de cableado para la telefonia de PCA',
    Fecha_Inicio: 2020-02-28T04:00:00.000Z,
    Fecha_Final: 2020-02-28T04:00:00.000Z,
    Id_Control_Cambio: 4,
    ID_Solicitante: 4,
    Correo_Solicitante: 'Cristo@gmail.com',
    Nombre_Solicitante: 'Jesus',
    Apellido_Solicitante: 'Cristo',
    Cedula_Solicitante: '11.222.222',
    Id_Evaluador: 1,
    Correo_Evaluador: 'Kollon01@gmail.com',
    Nombre_Evaluador: 'Jhonattan',
    Apellido_Evaluador: 'Romero',
    Cedula_Evaluador: '22.998.686',
    Correo_Responsabler: 'Kollon01@gmail.com',
    Nombre_Responsable: 'Jhonattan',
    Apellido_Responsable: 'Romero',
    Cedula_Responsable: '22.998.686',
    Servicio:
     '(4,Infraestructura,"Sevicios de infraestructura",t,"2020-02-27 16:20:47.313+00","2020-02-27 16:20:47.313+00")',
    Id_Servicio: 4,
    Nombre_Servicio: 'Infraestructura' } ]`



//NodeMailer funcion
//const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(EmailArray, ControlCambio, TeamDataCC, ClienteCC) {
  var TeamHtml = "";
  var ClienteHtml = "";
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  console.log(ControlCambio, "Desde main()");
  //console.log(ControlCambio[0].Apellido_Evaluador)
  console.log(TeamDataCC, "La data del Team");
  let testAccount = await nodemailer.createTestAccount();
  console.log(TeamDataCC, "TeamData desde main");

  //construir html para seccion de clientes
  ClienteCC.forEach((item, index)=> {
  	ClienteHtml  = ClienteHtml  + ` <tr>
										<td 
											style="
										    background: #eaeaea;
										    color: #272727;
										    text-align: center;
										">${item.Nombre_Empresa}</td>
										<td 
											style="text-align: center;"
											style="
										    background: #eaeaea;
										    color: #272727;
										    text-align: center;
										">${item.Nombre_Sucursal}</td>
									</tr>`
  });

  //Construir html para seccion del equipo de trabajo
  TeamDataCC.forEach((item, index) => {
  	console.log(item.Correo_Personal, "desde forEach");
  	EmailArray.push(item.Correo_Personal);
  	TeamHtml = TeamHtml + ` <tr>
								<td>${item.Nombre_Personal}</td>
								<td>${item.Apellido_Personal}</td>
								<td>${item.Correo_Personal}</td>
								<td>${item.Cedula_Personal}</td>
							</tr> `
  });
  TeamHtml = TeamHtml + `</table>
									 	</td>
									</tr>
							 	</table>
							</td>
					    </tr>
			  		</table>
				</td>
			</tr>
		</table>`;
  console.log(TeamHtml);
  console.log(EmailArray, "Desde Main");
  // create reusable transporter object using the default SMTP transport

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Notificacion de planificacion de control de cambio"', // sender address
    to: EmailArray,// list of receivers
    subject: "Planificacion Realizada✔", // Subject line
    html: `<table bgcolor="#212121" border="1" cellpadding="0" cellspacing="0" width="100%">
			<tr>
			 	<td>
			  		<table align="center" border="0" cellpadding="0" cellspacing="0" width="800">
				 		<tr>
							<td align="center" bgcolor="#AED581" style="padding: 40px 0 30px 0;">
							 <img src="https://images.vexels.com/media/users/3/131675/isolated/preview/30a4a09f3393d32f1a8c368373902c26-icono-de-cabeza-de-b-ho-by-vexels.png" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
							</td>
						</tr>
						<tr>
							<td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
							 	<table border="0" cellpadding="0" cellspacing="0" width="100%">
									<tr>
							 			<td>
										 Nombre del Control de Cambio: ${ControlCambio[0].Nombre_Control_Cambio}
										</td>
									</tr>
									<tr>
									  	<td style="padding: 20px 0 18px 0;">
							 			Descripcion:${ControlCambio[0].Descripcion_Control_Cambio}
							 			</td>
							 		</tr>
							 		<tr>
									  	<td style="padding: 0px 0 30px 0;">
							 			Servicio: ${ControlCambio[0].Nombre_Servicio}
							 			</td>
							 		</tr>
							 		<tr><table border="0" cellpadding="0" cellspacing="0" width="100%">
								 			<tr>
										 		<td width="260" valign="top">
										 			<table class="egt" border="0" cellpadding="5" cellspacing="0" width="100%">
													    <tr>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Empresa</th>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Sucursal</th>
													    </tr>
													 	${ClienteHtml}
													</table>
													<p></p>
													<table class="egt" border="0" cellpadding="0" cellspacing="0" width="100%">
													    <tr>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Fecha de Inicio</th>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Fecha de fializacion</th>
													    </tr>
													  	<tr>
														    <td 
														    	style="
															    background: #eaeaea;
															    color: #272727;
															    text-align: center;
															">${moment(ControlCambio[0].Fecha_Inicio).format('MM/DD/YYYY')}</td>
														    <td 
														    	style="
															    background: #eaeaea;
															    color: #272727;
															    text-align: center;
															">${moment(ControlCambio[0].Fecha_Final).format('MM/DD/YYYY')}</td>
													  	</tr>
													</table>
													<p></p>
													<table class="egt" border="0" cellpadding="0" cellspacing="0" width="100%">
													    <tr>
													    	<th> </th>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Nombre</th>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Apellido</th>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Correo</th>
													    	<th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Cedula</th>
													    </tr>
													 	<tr style="text-align: center;">
													 		<td style="
															    background: #eaeaea;
															    color: #272727;
															">Solicitante</td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															">${ControlCambio[0].Nombre_Solicitante}</td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															">${ControlCambio[0].Apellido_Solicitante}</td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															"><a href="${ControlCambio[0].Correo_Solicitante}">${ControlCambio[0].Correo_Solicitante}</a></td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															">${ControlCambio[0].Cedula_Solicitante}</td>
													  	</tr>
													  	<tr style="text-align: center;">
													 		<td>Evaluador</td>
													    	<td>${ControlCambio[0].Nombre_Evaluador}</td>
													    	<td>${ControlCambio[0].Apellido_Evaluador}</td>
													    	<td><a href="${ControlCambio[0].Correo_Evaluador}">${ControlCambio[0].Correo_Evaluador}</a></td>
													    	<td>${ControlCambio[0].Cedula_Evaluador}</td>
													  	</tr>
													  	<tr style="text-align: center;">
													 		<td style="
															    background: #eaeaea;
															    color: #272727;
															">Planificador</td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															">${ControlCambio[0].Nombre_Planificador}</td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															">${ControlCambio[0].Apellido_Planificador}</td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															"><a href="${ControlCambio[0].Correo_Planificador}">${ControlCambio[0].Correo_Planificador}</a></td>
													    	<td style="
															    background: #eaeaea;
															    color: #272727;
															">${ControlCambio[0].Cedula_Planificador}</td>
													  	</tr>
													  	<tr style="text-align: center;">
													 		<td>Responsable</td>
													    	<td>${ControlCambio[0].Nombre_Responsable}</td>
													    	<td>${ControlCambio[0].Apellido_Responsable}</td>
													    	<td><a href="${ControlCambio[0].Correo_Responsable}">${ControlCambio[0].Correo_Responsable}</a></td>
													    	<td>${ControlCambio[0].Cedula_Responsable}</td>
													  	</tr>
													</table>
										 		</td>
								 			</tr>
								 			<tr>
									 			<td  style="text-align: center;">
												<h1 style="
												    margin-bottom: 1px;
												    text-align: left;
												    border-bottom: 1px #d6d6d6 solid;
												    padding-bottom: 5p;
												    color: #4a4a4a;
												">Equipo de Trabajo</h1>
												<table class="egt" border="1" cellpadding="0" cellspacing="0" width="100%">
													<tr>
													    <th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Nombre</th>
													    <th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Apellido</th>
													    <th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Correo</th>
													    <th bgcolor="#AED581" style="
															    background: "#AED581";
															    color: white;">Cedula</th>
													</tr>` + TeamHtml,
// html body

  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//main().catch(console.error);

