//Rols table!! 
module.exports = (sequelize, Sequelize) => {
const Rol = sequelize.define('Tb_Rol', {
	Id_Rol: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},	
	Nombre_Rol : {
		type:Sequelize.STRING(100), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El rol no puede estar vacio'
      		}
   		 },
	},
	Descripcion_Rol: {
		type: Sequelize.TEXT
	}
},{
	freezeTableName: true
});

	return Rol;
}