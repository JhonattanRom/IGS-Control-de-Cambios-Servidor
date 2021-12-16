module.exports = (sequelize, Sequelize) => {
const Tipo = sequelize.define('Tb_Tipo_Control_Cambio', {
	Id_Tipo_CC: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_Tipo_CC : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El tipo no puede estar vacio'
      		}
   		 },
	},
	Descripcion_Tipo_CC: {
		type: Sequelize.TEXT
	}
},{
	freezeTableName: true
});

	return Tipo;
}