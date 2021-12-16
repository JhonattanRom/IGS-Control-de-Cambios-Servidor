//Servicios table!! 
module.exports = (sequelize, Sequelize) => {
const Sucursal = sequelize.define('Tb_Sucursal', {
	Id_sucursal: {
		type:Sequelize.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	Nombre_sucursal : {
		type:Sequelize.STRING(20), 
		allowNull: false,
		unique: true,
		validate: {
     		 notNull: {
       			 msg: 'El nombre no puede estar vacio'
      		}
   		 },
	},
	Id_empresa : {
		type: Sequelize.INTEGER,
	},
	Estado_sucursal: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
        defaultValue: true
	},
	Telefono_sucursal: {
		type:Sequelize.STRING(20)
	}
},{
	freezeTableName: true
});
	Sucursal.associate = function(models) {
	       db.sucursales.belongsTo(db.empresas, {as: 'empresas',foreignKey: 'Id_empresa', targetKey: 'Id_Empresa' });
    };
	return Sucursal;
}