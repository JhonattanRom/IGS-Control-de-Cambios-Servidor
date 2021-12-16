const db = require('../config/db.config.js');
const ControlCambio = db.controlesCambio;
const Prioridad = db.prioridades;
const Estatus = db.estatus;
const Servicios = db.servicios;
const Usuarios = db.usuarios;
const ControlCambioSucursal = db.SucursalControlCambio;
const PersonalControlCambio = db.PersonalControlCambio;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');


exports.findAll = async (req, res) => {
	console.log(req.body, "El body");
	let Tb_Control_Cambio, query;
	holis = '`${req.body.RolCC}`';
	console.log(req.body.RolCC, "El body 2");
	console.log(typeof(req.body.Personal));
	
	if (req.body.RolCC == "Id_evaluador") {
		console.log("Es Id_evaluador");
		query = 'WHERE  "Id_evaluador" IN (:personal) AND "Fecha_Inicio" BETWEEN ' + " '" + req.body.fechaInicioCtrl + "' "+ " AND " +  " '" + req.body.fechaFinalCtrl + " '" + ' ';
	}
	if (req.body.RolCC == "Id_solicitante") {
		console.log("Es Id_solicitante");
		query = 'SELECT * FROM "Tb_Control_Cambio" WHERE  "Id_solicitante" IN (:personal) AND "Fecha_Inicio" BETWEEN ' + " '" + req.body.fechaInicioCtrl + "' "+ " AND " +  " '" + req.body.fechaFinalCtrl + " '" + ' ';
	}
	if (req.body.RolCC == "Id_administrador") {
		console.log("Es Id_administrador");
		query = 'SELECT * FROM "Tb_Control_Cambio" WHERE  "Id_administrador" IN (:personal) AND "Fecha_Inicio" BETWEEN ' + " '" + req.body.fechaInicioCtrl + "' "+ " AND " +  " '" + req.body.fechaFinalCtrl + " '" + ' ';
	}
	if (req.body.RolCC == "Id_responsable") {
		console.log("Es Id_responsable");
		query = 'SELECT * FROM "Tb_Control_Cambio" WHERE  "Id_responsable" IN (:personal) AND "Fecha_Inicio" BETWEEN ' + " '" + req.body.fechaInicioCtrl + "' "+ " AND " +  " '" + req.body.fechaFinalCtrl + " '" + ' ';
	}
	if (req.body.RolCC == "Id_verificador") {
		console.log("Es Id_verificador");
		query = 'SELECT * FROM "Tb_Control_Cambio" WHERE "Id_verificador" IN (:personal) AND "Fecha_Inicio" BETWEEN ' + " '" + req.body.fechaInicioCtrl + "' "+ " AND " +  " '" + req.body.fechaFinalCtrl + " '" + ' ';
	}
	if (req.body.RolCC == "all") {
		console.log("Es all");
		query = 'SELECT * FROM "Tb_Control_Cambio" WHERE "Id_verificador" = :personal OR  "Id_responsable" = :personal OR "Id_administrador" = :personal';
	}
     var QueryTotal = JoinsMundial + query + Order;
	Tb_Control_Cambio = await sequelize.query(
	  QueryTotal,
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
		console.log(Tb_Control_Cambio, "Resultado");
		res.json(Tb_Control_Cambio);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error ", details : err})
	});
	
}




/*

Personal: 1
RolCC: "Id_evaluador"
fechaInicioCtrl: "2019-01-20 00:00:00-00"
fechaFinalCtrl: "2019-12-16 00:00:00-00"

 */
/*

{ Personal: 1,
  RolCC: 'Id_solicitante',
  fechaInicioCtrl: '2020-02-14 00:00:00-00',
  fechaFinalCtrl: '2020-02-06 00-00-00-00' }


 */





 						//Primera Solucion evaluar con if y crear Query en casa caso
/*

Tb_Control_Cambio = await sequelize.query(
	  'SELECT * FROM "Tb_Control_Cambio" WHERE  "Id_evaluador" = ?',
	  {
	    replacements: ['1'],
	    type: QueryTypes.SELECT
	  }
	);
	console.log(Tb_Control_Cambio, "Resultado");
}

 */


var JoinsMundial =
`
SELECT "Tb_Control_Cambio"."Id_Control_Cambio", "Tb_Control_Cambio"."Id_solicitante", 
"Tb_Control_Cambio"."Id_evaluador", "Tb_Control_Cambio"."Id_verificador", 
"Tb_Control_Cambio"."Id_administrador", "Tb_Control_Cambio"."Id_responsable", 
"Tb_Control_Cambio"."Id_servicio", "Tb_Control_Cambio"."Descripcion_Control_Cambio", 
"Tb_Control_Cambio"."Nombre_Control_Cambio", "Tb_Control_Cambio"."Estatus_Control_Cambio", 
"Tb_Control_Cambio"."Fecha_Solicitud", "Tb_Control_Cambio"."Fecha_Inicio", 
"Tb_Control_Cambio"."Fecha_Final", "Tb_Control_Cambio"."Fecha_Verificacion", 
"Tb_Control_Cambio"."Prioridad_CC", "Tb_Control_Cambio"."createdAt", 
"Tb_Control_Cambio"."updatedAt", 

"prioridad"."Id_prioridad" AS "prioridad.Id_prioridad", 
"prioridad"."Nombre_Prioridad" AS "prioridad.Nombre_Prioridad",  

"estatus"."Id_Estatus" AS "estatus.Id_Estatus", 
"estatus"."Nombre_Estatus" AS "estatus.Nombre_Estatus", 

"servicios"."Id_servicio_app" AS "servicios.Id_servicio_app", 
"servicios"."Nombre_servicio" AS "servicios.Nombre_servicio", 
 
"responsable"."Id_Usuario" AS "responsable.Id_Usuario", 
"responsable"."Cedula_Usuario" AS "responsable.Cedula_Usuario", 
"responsable"."Nombre_Usuario" AS "responsable.Nombre_Usuario", 
"responsable"."Apellido_Usuario" AS "responsable.Apellido_Usuario", 
"responsable"."Correo_Usuario" AS "responsable.Correo_Usuario", 

"administrador"."Id_Usuario" AS "administrador.Id_Usuario", 
"administrador"."Cedula_Usuario" AS "administrador.Cedula_Usuario",
"administrador"."Nombre_Usuario" AS "administrador.Nombre_Usuario", 
"administrador"."Apellido_Usuario" AS "administrador.Apellido_Usuario", 
"administrador"."Correo_Usuario" AS "administrador.Correo_Usuario", 
 
  

"evaluador"."Id_Usuario" AS "evaluador.Id_Usuario", 
"evaluador"."Cedula_Usuario" AS "evaluador.Cedula_Usuario",
"evaluador"."Nombre_Usuario" AS "evaluador.Nombre_Usuario",
"evaluador"."Apellido_Usuario" AS "evaluador.Apellido_Usuario", 
"evaluador"."Correo_Usuario" AS "evaluador.Correo_Usuario", 
     

"verificador"."Id_Usuario" AS "verificador.Id_Usuario",
"verificador"."Cedula_Usuario" AS "verificador.Cedula_Usuario",
"verificador"."Nombre_Usuario" AS "verificador.Nombre_Usuario", 
"verificador"."Apellido_Usuario" AS "verificador.Apellido_Usuario", 
"verificador"."Correo_Usuario" AS "verificador.Correo_Usuario", 
        
           
"solicitante"."Id_Usuario" AS "solicitante.Id_Usuario", 
"solicitante"."Cedula_Usuario" AS "solicitante.Cedula_Usuario", 
"solicitante"."Nombre_Usuario" AS "solicitante.Nombre_Usuario",
"solicitante"."Apellido_Usuario" AS "solicitante.Apellido_Usuario",
"solicitante"."Correo_Usuario" AS "solicitante.Correo_Usuario"

FROM "Tb_Control_Cambio" 
AS "Tb_Control_Cambio" 
INNER JOIN "Tb_Prioridad_Control_Cambio" 
AS "prioridad" ON "Tb_Control_Cambio"."Prioridad_CC" = "prioridad"."Id_prioridad" 
INNER JOIN "Tb_Estatus_Control_Cambio" AS "estatus" 
ON "Tb_Control_Cambio"."Estatus_Control_Cambio" = "estatus"."Id_Estatus" 
INNER JOIN "Tb_Servicio_App" AS "servicios" 
ON "Tb_Control_Cambio"."Id_servicio" = "servicios"."Id_servicio_app" 
LEFT OUTER JOIN "Tb_Usuario" AS "responsable" 
ON "Tb_Control_Cambio"."Id_responsable" = "responsable"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "administrador" 
ON "Tb_Control_Cambio"."Id_administrador" = "administrador"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "evaluador" 
ON "Tb_Control_Cambio"."Id_evaluador" = "evaluador"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "verificador" 
ON "Tb_Control_Cambio"."Id_verificador" = "verificador"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "solicitante" 
ON "Tb_Control_Cambio"."Id_solicitante" = "solicitante"."Id_Usuario" 
`;




const Order =` ORDER BY "Tb_Control_Cambio"."Id_Control_Cambio" ASC `

 





/*
SELECT "Tb_Control_Cambio"."Id_Control_Cambio", "Tb_Control_Cambio"."Id_solicitante", 
"Tb_Control_Cambio"."Id_evaluador", "Tb_Control_Cambio"."Id_verificador", 
"Tb_Control_Cambio"."Id_administrador", "Tb_Control_Cambio"."Id_responsable", 
"Tb_Control_Cambio"."Id_servicio", "Tb_Control_Cambio"."Descripcion_Control_Cambio", 
"Tb_Control_Cambio"."Nombre_Control_Cambio", "Tb_Control_Cambio"."Estatus_Control_Cambio", 
"Tb_Control_Cambio"."Fecha_Solicitud", "Tb_Control_Cambio"."Fecha_Inicio", 
"Tb_Control_Cambio"."Fecha_Final", "Tb_Control_Cambio"."Fecha_Verificacion", 
"Tb_Control_Cambio"."Prioridad_CC", "Tb_Control_Cambio"."createdAt", 
"Tb_Control_Cambio"."updatedAt", 

"prioridad"."Id_prioridad" AS "prioridad.Id_prioridad", 
"prioridad"."Nombre_Prioridad" AS "prioridad.Nombre_Prioridad",  

"estatus"."Id_Estatus" AS "estatus.Id_Estatus", 
"estatus"."Nombre_Estatus" AS "estatus.Nombre_Estatus", 

 "servicios"."Id_servicio_app" AS "servicios.Id_servicio_app", 
 "servicios"."Nombre_servicio" AS "servicios.Nombre_servicio", 
 
"responsable"."Id_Usuario" AS "responsable.Id_Usuario", 
"responsable"."Cedula_Usuario" AS "responsable.Cedula_Usuario", 
"responsable"."Nombre_Usuario" AS "responsable.Nombre_Usuario", 
"responsable"."Apellido_Usuario" AS "responsable.Apellido_Usuario", 
"responsable"."Correo_Usuario" AS "responsable.Correo_Usuario", 

"administrador"."Id_Usuario" AS "administrador.Id_Usuario", 
"administrador"."Cedula_Usuario" AS "administrador.Cedula_Usuario",
"administrador"."Nombre_Usuario" AS "administrador.Nombre_Usuario", 
"administrador"."Apellido_Usuario" AS "administrador.Apellido_Usuario", 
"administrador"."Correo_Usuario" AS "administrador.Correo_Usuario", 
 
  

"evaluador"."Id_Usuario" AS "evaluador.Id_Usuario", 
"evaluador"."Cedula_Usuario" AS "evaluador.Cedula_Usuario",
"evaluador"."Nombre_Usuario" AS "evaluador.Nombre_Usuario",
"evaluador"."Apellido_Usuario" AS "evaluador.Apellido_Usuario", 
"evaluador"."Correo_Usuario" AS "evaluador.Correo_Usuario", 
     

"verificador"."Id_Usuario" AS "verificador.Id_Usuario",
"verificador"."Cedula_Usuario" AS "verificador.Cedula_Usuario",
"verificador"."Nombre_Usuario" AS "verificador.Nombre_Usuario", 
"verificador"."Apellido_Usuario" AS "verificador.Apellido_Usuario", 
"verificador"."Correo_Usuario" AS "verificador.Correo_Usuario", 
        
           
"solicitante"."Id_Usuario" AS "solicitante.Id_Usuario", 
"solicitante"."Cedula_Usuario" AS "solicitante.Cedula_Usuario", 
"solicitante"."Nombre_Usuario" AS "solicitante.Nombre_Usuario",
"solicitante"."Apellido_Usuario" AS "solicitante.Apellido_Usuario",
"solicitante"."Correo_Usuario" AS "solicitante.Correo_Usuario"
             

FROM "Tb_Control_Cambio" 
AS "Tb_Control_Cambio" 
INNER JOIN "Tb_Prioridad_Control_Cambio" 
AS "prioridad" ON "Tb_Control_Cambio"."Prioridad_CC" = "prioridad"."Id_prioridad" 
INNER JOIN "Tb_Estatus_Control_Cambio" AS "estatus" 
ON "Tb_Control_Cambio"."Estatus_Control_Cambio" = "estatus"."Id_Estatus" 
INNER JOIN "Tb_Servicio_App" AS "servicios" 
ON "Tb_Control_Cambio"."Id_servicio" = "servicios"."Id_servicio_app" 
LEFT OUTER JOIN "Tb_Usuario" AS "responsable" 
ON "Tb_Control_Cambio"."Id_responsable" = "responsable"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "administrador" 
ON "Tb_Control_Cambio"."Id_administrador" = "administrador"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "evaluador" 
ON "Tb_Control_Cambio"."Id_evaluador" = "evaluador"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "verificador" 
ON "Tb_Control_Cambio"."Id_verificador" = "verificador"."Id_Usuario" 
LEFT OUTER JOIN "Tb_Usuario" AS "solicitante" 
ON "Tb_Control_Cambio"."Id_solicitante" = "solicitante"."Id_Usuario" 
WHERE "Tb_Control_Cambio"."Id_solicitante" = '2'
ORDER BY "Tb_Control_Cambio"."Id_Control_Cambio" ASC;
 */