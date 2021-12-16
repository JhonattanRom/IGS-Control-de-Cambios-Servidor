//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Tarea = sequelize.define('Tb_Tarea', {
	ID_Tarea: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_Tarea : {
		type:Sequelize.STRING(40), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Descripcion_Tarea: {
		type: Sequelize.TEXT
	},
	Estado_Tarea: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
        defaultValue: false
	},
	ID_Encargado: {
		type:Sequelize.INTEGER,
		allowNull: false
	},
	Id_Control_Cambio: {
		type:Sequelize.INTEGER,
		allowNull: false
	},
	Id_Informador: {
		type:Sequelize.INTEGER,
		allowNull: false
	}
},{
	freezeTableName: true
});

	return Tarea;
}