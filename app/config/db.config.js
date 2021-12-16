const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
const db = {};
//const Cargos = require("./app/Seeds/Cargos.seed.js");
const Cargos = require("../Seeds/Cargos.seed.js");
const Roles = require ("../Seeds/Roles.seed.js");
const Usuarios = require ("../Seeds/Usuarios.seed.js");
const TiposCC = require ("../Seeds/TiposCC.seed.js");
const Servicios = require("../Seeds/Servicios.seed.js");
const Estatus = require("../Seeds/Estatus.seed.js");
const Prioridades = require ("../Seeds/Prioridades.seed.js");
const Controlcambios = require ("../Seeds/Controlcambios.seed.js");
const Tareas = require("../Seeds/Tareas.seed.js");
const Comentarios = require ("../Seeds/Comentarios.seed.js");
const Sucursales = require ("../Seeds/Sucursales.seed.js");
const Empresas = require("../Seeds/Empresas.seed.js");
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Seeds
//const dataMedidas = require('../seeds/medidas.seed.js');
db.sequelize.sync({force : true}).then(() => {
  console.log("Drop And Resync with {force : true}");
 (async ()=>{
 //Usuarios
 await db.roles.sync({ force: true }).then(() => { db.roles.bulkCreate(Roles); });
 await db.cargos.sync({ force: true }).then(() => { db.cargos.bulkCreate(Cargos); });
 await db.usuarios.sync({ force: true }).then(() => { db.usuarios.bulkCreate(Usuarios); });
 //Controles de cambio
 await db.Tipos_CC.sync({ force: true }).then(() => { db.Tipos_CC.bulkCreate(TiposCC); });
 await db.servicios.sync({ force: true }).then(() => { db.servicios.bulkCreate(Servicios); });
 await db.estatus.sync({ force: true }).then(() => { db.estatus.bulkCreate(Estatus); });
 await db.prioridades.sync({ force: true }).then(() => { db.prioridades.bulkCreate(Prioridades); });
 await db.controlesCambio.sync({ force: true }).then(() => { db.controlesCambio.bulkCreate(Controlcambios); });
 //Equipos de trabajo
 await db.tareas.sync({ force: true }).then(() => { db.tareas.bulkCreate(Tareas); });
 await db.comentarios.sync({ force: true }).then(() => { db.comentarios.bulkCreate(Comentarios); });
 //Clientes
 await db.empresas.sync({ force: true }).then(() => { db.empresas.bulkCreate(Empresas); });
 await db.sucursales.sync({ force: true }).then(() => { db.sucursales.bulkCreate(Sucursales); });


 //await Roles();
 //await Usuarios();
 //await prioridades();
 //await Servicioss();
 //await estatus();
 //await tipoCC();
// await Empresas();
// await Sucursales();
// await ControlCambio();
 //await AddTareas();
 //await AddComentario();
 
 //await SucursalCambio();
 
// await initial();
 
  })();
  
  /*db.Pivote.create({
      Id_sucursal: 1,
      Id_Control_Cambio: 2,
    })*/
});







//Models/tables

//Usuarios
db.cargos = require ("../model/cargo.model.js")(sequelize, Sequelize);
db.usuarios = require("../model/usuario.model.js")(sequelize, Sequelize);
db.roles = require("../model/rol.model.js")(sequelize, Sequelize);
//Tareas
db.tareas = require("../model/tarea.model.js")(sequelize, Sequelize);
//Comentarios
db.comentarios = require("../model/comentario.model.js")(sequelize, Sequelize);
//Clientes
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.empresas = require("../model/empresa.model.js")(sequelize, Sequelize);
db.sucursales = require("../model/sucursal.model.js")(sequelize, Sequelize);

//Control de cambios
db.servicios = require('../model/servicio.model.js')(sequelize, Sequelize);
db.prioridades = require("../model/prioridad.model.js")(sequelize, Sequelize);
db.estatus = require("../model/estatus.model.js")(sequelize, Sequelize);
db.Tipos_CC = require("../model/tipoCC.model.js")(sequelize, Sequelize);
db.controlesCambio = require("../model/ControlCambio.model.js")(sequelize, Sequelize);
db.SucursalControlCambio = require("../model/SucursalControlCambio.model.js")(sequelize, Sequelize);
db.PersonalControlCambio = require("../model/PersonalControlCambio.model.js")(sequelize, Sequelize);
//Authentication

//Assosiations


                    //Comentarios - Usuarios
db.comentarios.belongsTo(db.usuarios, {as:"encargados", foreignKey: "ID_Encargado", targetKey:"Id_Usuario" });

db.usuarios.hasMany(db.comentarios, {as:"comentarios", foreignKey: "ID_Encargado" , sourceKey:"Id_Usuario"});


                      //Tareas - Comentarios
db.comentarios.belongsTo(db.tareas, {as: 'tareas',foreignKey: 'ID_Tarea', targetKey: 'ID_Tarea' });
db.tareas.hasMany(db.comentarios,  {as: 'comentarios', foreignKey: 'ID_Tarea', sourceKey: 'ID_Tarea'});

                    //Tareas - Informador
db.tareas.belongsTo(db.usuarios, {as:"informadores", foreignKey: "Id_Informador", targetKey: "Id_Usuario"});
db.usuarios.hasMany(db.tareas, {as:"informacionTareas", foreignKey: "Id_Informador", sourceKey: "Id_Usuario"});
                      




                      //Tareas - ControlDeCambio
db.tareas.belongsTo(db.controlesCambio, {as:"controles", foreignKey : "Id_Control_Cambio", targetKey: "Id_Control_Cambio"});
db.controlesCambio.hasMany(db.tareas, { as:"tareas", foreignKey:"Id_Control_Cambio", sourceKey:"Id_Control_Cambio"});

db.tareas.belongsTo(db.usuarios, {as:"encargados", foreignKey: "ID_Encargado", targetKey:"Id_Usuario"});
db.usuarios.hasMany(db.tareas, {as:"tareas", foreignKey:"ID_Encargado", sourceKey:"Id_Usuario"});

                      //Usuarios
//Relacion Usuario-Rol
db.usuarios.belongsTo(db.roles, { as: 'roles', foreignKey: 'Id_Rol_Usuario', sourceKey: 'Id_Rol'});
db.roles.hasMany(db.usuarios, {as: 'usuarios',foreignKey: 'Id_Rol_Usuario', sourceKey: 'Id_Rol'});
//Relacion Usuario-Cargo
db.usuarios.belongsTo(db.cargos, {as: 'cargos',foreignKey: 'Id_Cargo_Usuario', sourceKey: 'Id_tipo_cargo'});
db.cargos.hasMany(db.usuarios, {as: 'usuarios',foreignKey: 'Id_Cargo_Usuario', sourceKey: 'Id_tipo_cargo'});

                      //Clientes
//Relacion Sucursal-Empresa
db.sucursales.belongsTo(db.empresas, {as: 'empresas',foreignKey: 'Id_empresa', targetKey: 'Id_Empresa' });
db.empresas.hasMany(db.sucursales, {as: 'sucursales', foreignKey: 'Id_empresa', sourceKey: 'Id_Empresa'});


                      //Control de Cambios
//Relacion ControlCAmbio - servicios
db.controlesCambio.belongsTo(db.servicios, {as: 'servicios', foreignKey: 'Id_servicio', sourceKey: 'Id_servicio_app'});
db.servicios.hasMany(db.controlesCambio, {as: 'ControlDeCambio', foreignKey: 'Id_servicio', sourceKey: 'Id_servicio_app'});
//Relacion ControlCambio - Prioridades
db.controlesCambio.belongsTo(db.prioridades, {as: 'prioridad',foreignKey: "Prioridad_CC", sourceKey: "Id_prioridad"});
db.prioridades.hasMany(db.controlesCambio, {as: 'ControlDeCambio',foreignKey: "Prioridad_CC", sourceKey: "Id_prioridad"});
//Relacion ControlCambio -  Estatus
db.controlesCambio.belongsTo(db.estatus, {as: 'estatus',foreignKey: "Estatus_Control_Cambio", sourceKey: "Id_Estatus"});
db.estatus.hasMany(db.controlesCambio, {as: "ControlDeCambio", foreignKey: "Estatus_Control_Cambio", sourceKey: "Id_Estatus"});

//Relacion  ControlCambio - Responsables
db.controlesCambio.belongsTo(db.usuarios, {as: 'responsable', foreignKey:"Id_responsable", sourceKey: "Id_Usuario"});
db.controlesCambio.belongsTo(db.usuarios, {as:"administrador", foreignKey:"Id_administrador", sourceKey: "Id_Usuario"});
db.controlesCambio.belongsTo(db.usuarios, {as:"evaluador", foreignKey:"Id_evaluador", sourceKey: "Id_Usuario"});
db.controlesCambio.belongsTo(db.usuarios, {as:"verificador", foreignKey:"Id_verificador", sourceKey: "Id_Usuario"});
db.controlesCambio.belongsTo(db.usuarios, {as:"solicitante", foreignKey:"Id_solicitante", sourceKey: "Id_Usuario"});

//db.usuarios.hasMany(db.controlesCambio, {as: "control", foreignKey:"Id_responsable", sourceKey: "Id_Usuario"});

/*
//Relacion clientes Pivote(Sucursal_ControlCambio)
db.SucursalControlCambio.belongsToMany(db.sucursales, {foreignKey: 'Id_sucursal', sourceKey: 'Id_sucursal'});
db.sucursales.hasMany(db.controlesCambio, {foreignKey: 'Id_sucursal', sourceKey: 'Id_sucursal'});


//Relacion ControlCambio Pivote(Sucursal_ControlCambio)
db.SucursalControlCambio.belongsToMany(db.controlesCambio, {foreignKey: 'Id_Control_Cambio', sourceKey: 'Id_Control_Cambio'});
db.controlesCambio.hasMany(db.controlesCambio, {foreignKey: 'Id_Control_Cambio', sourceKey: 'Id_Control_Cambio'});
*/

db.usuarios.belongsToMany(db.controlesCambio, {
  through: db.PersonalControlCambio,
    as: 'controles',
    foreignKey: 'Id_Usuario'});

db.controlesCambio.belongsToMany(db.usuarios, {
  through: db.PersonalControlCambio,
    as: 'personal',
    foreignKey: 'Id_Control_Cambio'});


db.sucursales.belongsToMany(db.controlesCambio, {
    through: db.SucursalControlCambio,
    as: 'controles',
    foreignKey: 'Id_sucursal'});
db.controlesCambio.belongsToMany(db.sucursales, {
    through: db.SucursalControlCambio,
    as: 'sucursales',
    foreignKey: 'Id_Control_Cambio'});

module.exports = db


/*const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
 
module.exports = db
*/

/*const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
env.database,
env.username,
env.host,
env.password,                              
{
	host: env.host,
	dialect: env.dialect,
	operatorsAliases: false,

	pool: {
		max: env.max,
		min: env.pool.min,
		acquire: env.pool.acquire,
	}
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 

//modelos de las tablas 
db.customers = require ('../model/customer.model.js')(sequelize, Sequelize);
module.exports = db; */