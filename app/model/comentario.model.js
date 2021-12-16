//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Comentario = sequelize.define('Tb_Comentario', {
	Id_Comentario: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Comentario: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	ID_Tarea: {
		type:Sequelize.INTEGER,
		allowNull: false
	},
	ID_Encargado: {
		type:Sequelize.INTEGER,
		allowNull: false
	}
},{
	freezeTableName: true
});

	return Comentario;
}