//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Servicio = sequelize.define('Tb_Servicio_App', {
	Id_servicio_app: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_servicio : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Descripcion_servicio: {
		type: Sequelize.TEXT
	},
	Estado_servicio: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
        defaultValue: true
	}
},{
	freezeTableName: true
});

	return Servicio;
}