var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
app.use(bodyParser.json());


const cors = require('cors');
const corsOption = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
};
app.use(cors(corsOption));

const db = require('./app/config/db.config.js')

//Force : true will drop the table if it already exists


require("./app/route/customer.route.js")(app);
require("./app/route/servicio.route.js")(app);
require("./app/route/cargo.route.js")(app);
require("./app/route/empresa.route.js")(app);
require("./app/route/sucursal.route.js")(app);
require("./app/route/usuario.route.js")(app);
require('./app/route/rol.route.js')(app);
require("./app/route/rol.route.js")(app);
require("./app/route/estatus.route.js")(app);
require("./app/route/tipoCC.route.js")(app);
require("./app/route/controlCambio.route.js")(app);
require("./app/route/signup.route.js")(app);
require("./app/route/signin.route.js")(app);
require("./app/route/prioridad.route.js")(app);
require("./app/route/cliente.route.js")(app);
require("./app/route/tarea.route.js")(app);
require("./app/route/comentario.route.js")(app);
require("./app/route/reporte.route.js")(app);
//Create a Server 
 var server =  app.listen(8081, function () {

 	var host = server.address().address; 
 	var port = server.address().port; 

 	console.log("App Listening at http://%s:%s", host, port);
 })
/*
function SucursalCambio(){
let controlSucursal = [{
    Id_Control_Cambio : 1,
    Id_sucursal :1,
}]; 
  const ControlSucursal = db.SucursalControlCambio;
  for (let i = 0; i < controlSucursal.length; i++){
      ControlSucursal.create(controlSucursal[i]);
    }
}
*/


function AddComentario(){
  let comentarios = [{
    Comentario : "Ocupo un listado de usuarios para realizar un login!",
    ID_Tarea : 1
  }];
  const Comentario = db.comentarios;
    Comentario.bulkCreate(comentarios,
                          {fields: ['Comentario', "ID_Tarea"]});
}

function AddTareas(){
let tareas = [{
  Nombre_Tarea : "Realizar Login",
  Descripcion_Tarea : "Realizar un login con 12 digitos para el paassword",
  Estado_Tarea : false,
  ID_Encargado : 2,
  Id_Control_Cambio : 1
},{
  Nombre_Tarea : "Panel de administracion de usurios",
  Descripcion_Tarea : "Realizar un panel de administracion",
  Estado_Tarea : false,
  ID_Encargado : 2,
  Id_Control_Cambio : 1
},{
  Nombre_Tarea : "Testear Panel",
  Descripcion_Tarea : "Realizar un login con 12 digitos para el paassword",
  Estado_Tarea : false,
  ID_Encargado : 2,
  Id_Control_Cambio : 1
},{
  Nombre_Tarea : "Testear Login",
  Descripcion_Tarea : "Realizar un login con 12 digitos para el paassword",
  Estado_Tarea : false,
  ID_Encargado : 2,
  Id_Control_Cambio : 1
},{
  Nombre_Tarea : "Realizar tabla usuarios",
  Descripcion_Tarea : "Realizar una tabla para todos los usuarios",
  Estado_Tarea : false,
  ID_Encargado : 3,
  Id_Control_Cambio : 1
}];
const Tareas = db.tareas;
  Tareas.bulkCreate(tareas, 
                {fields: ['Nombre_Tarea', "Descripcion_Tarea","Estado_Tarea","ID_Encargado","Id_Control_Cambio"]});

}

 function ControlCambio(){
  let controlcambio = [
  {
    Id_solicitante : 2,
    Id_evaluador : null,
    Id_verificador :null,
    Id_administrador : null,
    Id_responsable : null,
    Id_servicio : 1,
    Descripcion_Control_Cambio : "Esto es una descripcion de control de cambio",
    Nombre_Control_Cambio : "Primer control de cambio",
    Estatus_Control_Cambio : 1,
    Fecha_Solicitud : "12/23/2019",
    //Fecha_Inicio : req.body.Fecha_Inicio,
    //Fecha_Final : req.body.Fecha_Final,
    //Fecha_Verificacion : req.body.Fecha_Verificacion,
    //Estado_cargo : req.body.Estado_cargo,
    Prioridad_CC : 3,
  },
  {
    Id_solicitante : 2,
    Id_evaluador : null,
    Id_verificador :null,
    Id_administrador : null,
    Id_responsable : null,
    Id_servicio : 1,
    Descripcion_Control_Cambio : "Cntrol de cambio para la Telefonia del centro Comercial Sambil Margarita",
    Nombre_Control_Cambio : "Telefonia Sambil M.",
    Estatus_Control_Cambio : 2,
    Fecha_Solicitud : "12/23/2019",
    //Fecha_Inicio : req.body.Fecha_Inicio,
    //Fecha_Final : req.body.Fecha_Final,
    //Fecha_Verificacion : req.body.Fecha_Verificacion,
    //Estado_cargo : req.body.Estado_cargo,
    Prioridad_CC : 2,
  },
  {
    Id_solicitante : 4,
    Id_evaluador : null,
    Id_verificador :null,
    Id_administrador : 2,
    Id_responsable : 3,
    Id_servicio : 4,
    Descripcion_Control_Cambio : "Cambio de cableado para la telefonia de PCA",
    Nombre_Control_Cambio : "Cambio de Cableado PCA",
    Estatus_Control_Cambio : 3,
    Fecha_Solicitud : "12/23/2019",
    //Fecha_Inicio : req.body.Fecha_Inicio,
    //Fecha_Final : req.body.Fecha_Final,
    //Fecha_Verificacion : req.body.Fecha_Verificacion,
    //Estado_cargo : req.body.Estado_cargo,
    Prioridad_CC : 1,
  },
  {
    Id_solicitante : 2,
    Id_evaluador : 3,
    Id_verificador :null,
    Id_administrador : 2,
    Id_responsable : 1,
    Id_servicio : 1,
    Descripcion_Control_Cambio : "Cambio de Infraestructura de la oficina de Administracion",
    Nombre_Control_Cambio : "Cambio de Infraestructura",
    Estatus_Control_Cambio : 4,
    Fecha_Solicitud : "12/23/2019",
    Fecha_Inicio : "12/23/2019",
    Fecha_Final : "12/23/2019",
    //Fecha_Verificacion : req.body.Fecha_Verificacion,
    //Estado_cargo : req.body.Estado_cargo,
    Prioridad_CC :3,
  },
  {
    Id_solicitante : 2,
    Id_evaluador : 3,
    Id_verificador :null,
    Id_administrador : 2,
    Id_responsable : 1,
    Id_servicio : 1,
    Descripcion_Control_Cambio : "Administracion de tareas",
    Nombre_Control_Cambio : "Cambio de tareas",
    Estatus_Control_Cambio : 5,
    Fecha_Solicitud : "12/23/2019",
    Fecha_Inicio : "12/23/2019",
    Fecha_Final : "12/23/2019",
    //Fecha_Verificacion : req.body.Fecha_Verificacion,
    //Estado_cargo : req.body.Estado_cargo,
    Prioridad_CC : 2,
  },
  {
    Id_solicitante : 2,
    Id_evaluador : 3,
    Id_verificador :2,
    Id_evaluador : 1,
    Id_administrador : 2,
    Id_responsable : 1,
    Id_servicio : 1,
    Descripcion_Control_Cambio : "Desarrollo de sistema administrativo IGS",
    Nombre_Control_Cambio : "Sistema IGS Desarrollo",
    Estatus_Control_Cambio : 6,
    Fecha_Solicitud : "12/23/2019",
    Fecha_Inicio : "01/23/2019",
    Fecha_Final :"02/30/2020",
    //Fecha_Verificacion : req.body.Fecha_Verificacion,
    //Estado_cargo : req.body.Estado_cargo,
    Prioridad_CC : 1,
  },
  {
    Id_solicitante : 2,
    Id_evaluador : 3,
    Id_verificador :2,
    Id_evaluador : 1,
    Id_administrador : 2,
    Id_responsable : 1,
    Id_servicio : 1,
    Descripcion_Control_Cambio : "Manuales de procedimientos",
    Nombre_Control_Cambio : "Desarrollo para manuales de procedimientos",
    Estatus_Control_Cambio : 7,
    Fecha_Solicitud : "12/23/2019",
    Fecha_Inicio : "01/23/2019",
    Fecha_Final :"02/30/2020",
    Prioridad_CC : 2,
  }]

  const Control = db.controlesCambio;
  for (let i = 0; i < controlcambio.length; i++){
    Control.create(controlcambio[i]);
  }

}

 function tipoCC(){
  let tipoCC = [{
    Nombre_Tipo_CC : "Nuevo",
    Descripcion_Tipo_CC: "Control de cabio sin ningun antecedente"
  },
  {
    Nombre_Tipo_CC : "Con antecedentes",
    Descripcion_Tipo_CC: "Control de cabio con antecedente"
  }]

  const Tipo = db.Tipos_CC;
  for (let i = 0; i < tipoCC.length; i++){
    Tipo.create(tipoCC[i]);
  }
}

 function estatus(){
  let estatus = [{
    Nombre_Estatus: "Borrador",
    Descripcion_Estatus: "Estado inicial del Control de cambio"
  },
  {
    Nombre_Estatus: "Rechazado",
    Descripcion_Estatus: "Control de cambio rechazado"
  },
  {
    Nombre_Estatus: "Aprobado",
    Descripcion_Estatus: "Control de cambio aprobado para ser ejecutado"
  },
  {
    Nombre_Estatus: "Planificado",
    Descripcion_Estatus: "Borrador ya planificado y administrado"
  },{
    Nombre_Estatus: "Esperando para ejecucion",
    Descripcion_Estatus: "Control de cambio en espera de ejecucion"
  },
  {
    Nombre_Estatus: "En Ejecucion",
    Descripcion_Estatus: "Control de cambio en ejecucion"
  },
  {
    Nombre_Estatus: "Terminado",
    Descripcion_Estatus: "Control de cambio terminado"
  }]

  const Estatus = db.estatus;
  for (let i = 0; i < estatus.length; i++){
    Estatus.create(estatus[i]);
  }
    
}


 function prioridades(){

let prioridades = [{
  Nombre_Prioridad: "Baja",
  Descripcion_Rol: "No representa mayor peligro"
},
{
  Nombre_Prioridad: "Media",
  Descripcion_Rol: "No atenderla puede presentar fallas"
},
{
  Nombre_Prioridad: "Alta",
  Descripcion_Rol: "Se debe atender inmediatamente"
}];

const Prioridades = db.prioridades;
  for (let i = 0; i < prioridades.length; i++){
    Prioridades.create(prioridades[i]);
  }

}


 function Roles(){
let roles = [{
    Nombre_Rol : "Administrador",
    Descripcion_Rol : "Todos los permisos del sistema garantizados"
},{
   Nombre_Rol : "Director del comite de control de cambios",
   Descripcion_Rol : "Nivel de permisos alto con respecto a los controles de cambio"
},{
    Nombre_Rol : "Miembro del comite de control de cambios",
    Descripcion_Rol : "Nivel de permisos medio con respecto a los controles de cambio"
},{
    Nombre_Rol : "Operador",
    Descripcion_Rol : "Nivel de permisos bajo con respecto a los controles de cambio"
}]
const Roles = db.roles;
  for (let i = 0; i < roles.length; i++){
     Roles.create(roles[i]);
  }
};

 function Usuarios(){
let usuarios = [{
    Cedula_Usuario : "22.998.686",
    Nombre_Usuario : "Jhonattan",
    Apellido_Usuario : "Romero",
    Id_Cargo_Usuario : 1,
    Id_Rol_Usuario : 1,
    Correo_Usuario : "Kollon01@gmail.com",
    Password_Usuario : "MiContraseña",
    Estado_Usuario : true
},
{
    Cedula_Usuario : "22.666.666",
    Nombre_Usuario : "Agustin",
    Apellido_Usuario : "Marcano",
    Id_Cargo_Usuario : 3,
    Id_Rol_Usuario : 2,
    Correo_Usuario : "Agumon666@gmail.com",
    Password_Usuario : "SuContraseña",
    Estado_Usuario : false
},
{
    Cedula_Usuario : "44.666.666",
    Nombre_Usuario : "Martin",
    Apellido_Usuario : "Ramos",
    Id_Cargo_Usuario : 1,
    Id_Rol_Usuario : 3,
    Correo_Usuario : "Martin@gmail.com",
    Password_Usuario : "SuContraseña",
    Estado_Usuario : false
},
{
    Cedula_Usuario : "11.222.222",
    Nombre_Usuario : "Jesus",
    Apellido_Usuario : "Cristo",
    Id_Cargo_Usuario : 1,
    Id_Rol_Usuario : 4,
    Correo_Usuario : "Cristo@gmail.com",
    Password_Usuario : "SuContraseña",
    Estado_Usuario : false
},
{
    Cedula_Usuario : "44.333.111",
    Nombre_Usuario : "Yamileth",
    Apellido_Usuario : "Leon",
    Id_Cargo_Usuario : 1,
    Id_Rol_Usuario : 4,
    Correo_Usuario : "Yamileth@gmail.com",
    Password_Usuario : "SuContraseña",
    Estado_Usuario : true
},
{
    Cedula_Usuario : "11.227.122",
    Nombre_Usuario : "Jose",
    Apellido_Usuario : "Restos",
    Id_Cargo_Usuario : 1,
    Id_Rol_Usuario : 4,
    Correo_Usuario : "Restos@gmail.com",
    Password_Usuario : "SuContraseña",
    Estado_Usuario : true
}];

const Usuarios = db.usuarios;
  for (let i = 0; i < usuarios.length; i++){
     Usuarios.create(usuarios[i]);
  }
};

 function Sucursales(){
  let sucursales = [{
     Nombre_sucursal: "Primera",
     Telefono_sucursal: "1231232321",
     Estado_sucursal: true,
     Id_empresa: 1 },
     {
     Nombre_sucursal: "Segunda",
     Telefono_sucursal: "1231232321",
     Estado_sucursal: true,
     Id_empresa: 3  },
     {
     Nombre_sucursal: "Tercera",
     Telefono_sucursal: "1231232321",
     Estado_sucursal: false ,
     Id_empresa: 2 }
  ]
  const Sucursales = db.sucursales;
  Sucursales.bulkCreate(sucursales, 
                {fields: ['Nombre_sucursal', "Telefono_sucursal","Estado_sucursal","Id_empresa"]});
  
}

 function Empresas(){
  let empresas = [
  {Nombre_empresa: "McDonalds",
   Rif_empresa: "1231232321",
   Estado_empresa: true },
  {Nombre_empresa: "Sambil",
   Rif_empresa: "13333333",
   Estado_empresa: false },
  {Nombre_empresa: "Sigo",
   Rif_empresa: "1111111111",
   Estado_empresa: true }
  ]
   const Empresa = db.empresas;
    Empresa.bulkCreate(empresas, 
                {fields: ["Nombre_empresa",'Rif_empresa', "Estado_empresa"]});
}

/*
 function Cargos(){
  let cargos = [
  {
    Nombre_cargo: "Desarrollador",
    Descripcion_cargo: "Se encarga de programar paginas webs para clientes",
    Estado_cargo: false
 },
 {
    Nombre_cargo: "Administrador de base de datos",
    Descripcion_cargo: "Se encarga de administrar base de datos",
    Estado_cargo: true
 },{
   Nombre_cargo: "Analista de sistemas",
    Descripcion_cargo: "Se encarga de idear el desarrollo de los software a desarrollar",
    Estado_cargo: true
 }
  ]
    const Cargo = db.cargos;
    for (let i = 0; i < cargos.length; i++) {
    Cargo.create(cargos[i]);
  }
};*/


 function Servicioss(){
let servicios = [
    {
      Nombre_servicio: "Desarrollo web",
      Descripcion_servicio: "Se encarga del desarrollo de apicaciones agiles en el entorno web",
      Estado_servicio: false
    },
    {
      Nombre_servicio: "Administracion de BD",
      Descripcion_servicio: "Se encarga de la administracion de las bases de datos",
      Estado_servicio: true
    },
    {
      Nombre_servicio: "Telefonia",
      Descripcion_servicio: "Sevicios aplicaciones a los servicios telefonicos",
      Estado_servicio: false
    },
    {
      Nombre_servicio: "Infraestructura",
      Descripcion_servicio: "Sevicios de infraestructura",
      Estado_servicio: true
    }
  ]
    const Servicio = db.servicios;
  for (let i = 0; i < servicios.length; i++) {
    Servicio.create(servicios[i]);
  }
};


/*
  function initial(){
 
  let customers = [
    {
      firstname: "Joe",
      lastname: "Thomas",
      age: 36
    },
    {
      firstname: "Peter",
      lastname: "Smith",
      age: 18
    },
    {
      firstname: "Lauren",
      lastname: "Taylor",
      age: 31
    },
    {
      firstname: "Mary",
      lastname: "Taylor",
      age: 24
    },
    {
      firstname: "David",
      lastname: "Moore",
      age: 25
    },
    {
      firstname: "Holly",
      lastname: "Davies",
      age: 27
    },
    {
      firstname: "Michael",
      lastname: "Brown",
      age: 45
    }
  ]
 
  // Init data -> save to PostgreSQL
  const Customer = db.customers;
  for (let i = 0; i < customers.length; i++) { 
    Customer.create(customers[i]);  
  }
}*/