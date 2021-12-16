//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const ControlCambio = sequelize.define('Tb_Control_Cambio', {
	Id_Control_Cambio: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Id_solicitante: {
		type:Sequelize.INTEGER,
		allowNull: false,
	},
	Id_evaluador: {
		type:Sequelize.INTEGER,
		defaultValue: null
	},
	Id_verificador: {
		type:Sequelize.INTEGER,
		defaultValue: null
	},
	Id_administrador: {
		type:Sequelize.INTEGER,
		defaultValue: null
	},
	Id_responsable: {
		type:Sequelize.INTEGER,
		defaultValue: null
		//allowNull: false,
	},
	Id_servicio: {
		type:Sequelize.INTEGER,
		allowNull: false,
	},
	Descripcion_Control_Cambio: {
		type: Sequelize.TEXT
	},
	Nombre_Control_Cambio: {
		type:Sequelize.STRING(100), 
		allowNull: false,
		unique: false,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Estatus_Control_Cambio: {
		type:Sequelize.INTEGER,
		defaultValue: 1
	},
	Fecha_Solicitud: {
		type:Sequelize.DATE,
		allowNull: false,
	},
	Fecha_Inicio: {
		type:Sequelize.DATE,
	},
	Fecha_Final: {
		type:Sequelize.DATE,
	},
	Fecha_Verificacion: {
		type:Sequelize.DATE,
	},
	Prioridad_CC: {
		type:Sequelize.INTEGER,
		allowNull: false,
	}
},{
	freezeTableName: true
});

	return ControlCambio;
}