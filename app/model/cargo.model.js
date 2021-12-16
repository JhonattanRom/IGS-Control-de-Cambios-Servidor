//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Cargo = sequelize.define('Tb_Tipo_Cargo', {
	Id_tipo_cargo: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_cargo : {
		type:Sequelize.STRING(40), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Descripcion_cargo: {
		type: Sequelize.TEXT
	},
	Estado_cargo: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
        defaultValue: true
	}
},{
	freezeTableName: true
});

	return Cargo;
}