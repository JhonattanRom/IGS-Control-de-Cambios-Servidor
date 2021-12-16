//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Empresa = sequelize.define('Tb_Empresa', {
	Id_Empresa: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_empresa : {
		type:Sequelize.STRING(40), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Rif_empresa: {
		type: Sequelize.TEXT
	},
	Estado_empresa: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
        defaultValue: true
	}
},{
	freezeTableName: true
});
	Empresa.associate = function(models) {
        db.empresas.hasMany(db.sucursales, {as: 'sucursales', foreignKey: 'Id_empresa', sourceKey: 'Id_Empresa'});
    };
	return Empresa;
}