module.exports = (sequelize, Sequelize) => {
const Prioridad = sequelize.define('Tb_Prioridad_Control_Cambio', {
	Id_prioridad: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_Prioridad : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'La prioridad no puede estar vacia'
      		}
   		 },
	},
	Descripcion_Prioridad: {
		type: Sequelize.TEXT
	}
},{
	freezeTableName: true
});

	return Prioridad;
}