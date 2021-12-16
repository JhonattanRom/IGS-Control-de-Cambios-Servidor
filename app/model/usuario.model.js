//Usuarios table!! 
module.exports = (sequelize, Sequelize) => {
const Usuario = sequelize.define('Tb_Usuario', {
	Id_Usuario: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Cedula_Usuario : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'La cedula no puede estar vacia'
      		}
   		 },
	},	
	Nombre_Usuario : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Apellido_Usuario : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		validate: {
     		 notNull: {
       			 msg: 'El apellido no puede estar vacio'
      		}
   		 },
	},
	Id_Cargo_Usuario: {
		type:Sequelize.INTEGER, 
	},
	Id_Rol_Usuario: {
		type:Sequelize.INTEGER, 
	},	
	Correo_Usuario : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El correo no puede estar vacio'
      		}
   		 },
	},
	Password_Usuario : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		validate: {
     		 notNull: {
       			 msg: 'El password no puede estar vacio'
      		}
   		 },
	},	
	Estado_Usuario: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
        defaultValue: true
	}
},{
	freezeTableName: true
});

	return Usuario;
}