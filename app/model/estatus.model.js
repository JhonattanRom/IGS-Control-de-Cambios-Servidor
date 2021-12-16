module.exports = (sequelize, Sequelize) => {
const Estatus = sequelize.define('Tb_Estatus_Control_Cambio', {
	Id_Estatus: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_Estatus : {
		type:Sequelize.STRING(40), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'La Estatus no puede estar vacia'
      		}
   		 },
	},
	Descripcion_Estatus: {
		type: Sequelize.TEXT
	}
},{
	freezeTableName: true
});

	return Estatus;
}