//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Sucursal_Control_Cambio = sequelize.define('Tb_Sucursal_Control_Cambio', {
	Id_Sucursal_Control_Cambio: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Id_Control_Cambio: {
		type:Sequelize.INTEGER,
		allowNull: false,
	},
	Id_sucursal: {
		type:Sequelize.INTEGER,
		allowNull: false,
	},
},{
	freezeTableName: true
});

	return Sucursal_Control_Cambio;
}