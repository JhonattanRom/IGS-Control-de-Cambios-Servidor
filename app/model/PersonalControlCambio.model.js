//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Personal_Control_Cambio = sequelize.define('Tb_Personal_Control_Cambio', {
	Id_Personal_Control_Cambio: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Id_Control_Cambio: {
		type:Sequelize.INTEGER,
		allowNull: false,
	},
	Id_Usuario: {
		type:Sequelize.INTEGER,
		allowNull: false,
	},
},{
	freezeTableName: true
});

	return Personal_Control_Cambio;
}