const db = require('../config/db.config.js');
const Empresa = db.empresas;
const Sucursal = db.sucursales;
const env = require('../config/env.js');

const Sequelize = require('sequelize');
const sequelize = db.sequelize;

// FETCH All Customers
exports.findAll = (req, res) => {
  Empresa.findAll({
  // Add order conditions here....
        order: [
            ['Id_Empresa', 'ASC'],
        ]}).then(empresa => {
      // Send All empresas to Client
      res.json(empresa.sort(function(c1, c2){return c1.id - c2.id}));
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: "error", details: err});
    });
};


//Borrar un cargo por id
exports.delete = ( req , res ) => {
	const id = req.params.id;
	Empresa.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({msg: "Se elimino la empresa correctamente"});
	})
};


//FindByID(Nuevo)
exports.findById = (req , res) => {
	Empresa.findByPk(req.params.id).then(empresa => {
		res.json(empresa);
	}).catch( err => {
		console.log(err);
		res.status(500).json( {msg: "error", details: err});
	});
};


//Update cargo (Nuevo)
exports.update = ( req, res ) => {
	const id = req.body.Id_Empresa; 
	console.log("Este es el id:",id);
	Empresa.update( req.body,
              {where: {Id_Empresa: id } }).then(() => {
              	res.status(200).json( { mgs: "Update Successfully -> Empresa Id = " + id});
              }).catch(err => {
              	console.log(err);
              	res.status(500).json( {msg: "error", details: err});
              });
};





/*

exports.create = (req, res) => {
	return sequelize.transaction( async ( t )=> {

const empresa = await Empresa.create({
			Nombre_empresa : req.body.Nombre_empresa,
			Rif_empresa : req.body.Rif_empresa,
			//"Estado_empresa" : req.body.Estado_empresa,
		}, {transaction: t}).the(empresaR => {
			var Sucursal = [];
			req.body.sucursales.forEach((item, index) => {
				Sucursales.push({
					"Nombre_sucursal": req.body.sucursales[index].Nombre_sucursal,
					"Id_empresa": empresa.Id_Empresa,
					"Telefono_sucursal" : req.body.sucursales[index].Telefono_sucursal,
			});
const sucursalesR = await Sucursal.bulkCreate(Sucursales, 
		            {fields: ["Id_empresa",'Nombre_sucursal', "Telefono_sucursal"]}, 
		            {transaction: t});
		}).then(resultado => {
			res.json(resultado);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error ", details : err})
		});
	});
})
};
*/


exports.create = (req, res) => {
  //let relacion = req.body.relacion;
  //delete req.body.relacion;
  //let proveedor = req.body;
  console.log(req.body, "Este es el body");
  var Sucursales = [];
  db.sequelize.transaction().then((t) => {
    return Empresa.create({
      Nombre_empresa : req.body.Nombre_empresa,
	  Rif_empresa : req.body.Rif_empresa,
    }, { transaction: t }).then(empresa => {
    	console.log(empresa.dataValues.Id_Empresa, "empresa data");
    	console.log(empresa.Id_Empresa, "la otra id empresa");
      	req.body.sucursales.forEach((item, index) => {
		Sucursales.push({
					"Nombre_sucursal": req.body.sucursales[index].Nombre_sucursal,
					"Id_empresa": empresa.Id_Empresa,
					"Telefono_sucursal" : req.body.sucursales[index].Telefono_sucursal,
		})
		console.log(Sucursales, "Arreglo aramado!!");
	  });
      return Sucursal.bulkCreate(Sucursales, {transaction: t});
    }).then(()=> {
      res.json({
        msg: 'Se proceso correctamente.',
        details: []
      });
      return t.commit();
    }).catch(err => {
    	console.log(err);
      res.status(500).json({
        msg: 'Se encontro un problema.',
        details: err
      });
      return t.rollback();
    });
  });
};




exports.happy3 = async (req, res) => {
	try {

  const result = await sequelize.transaction(async (t) => {

    const empresa = await Empresa.create({
      Nombre_empresa : req.body.Nombre_empresa,
	  Rif_empresa : req.body.Rif_empresa,
    }, { transaction: t });

	var Sucursales = [];

    req.body.sucursales.forEach((item, index) => {
				Sucursales.push({
					"Nombre_sucursal": req.body.sucursales[index].Nombre_sucursal,
					"Id_empresa": empresa.Id_Empresa,
					"Telefono_sucursal" : req.body.sucursales[index].Telefono_sucursal,
				})
					console.log(Sucursales, "Arreglo aramado!!");
			});

	const sucursal = await Sucursal.bulkCreate(Sucursales, 
		            {fields: ["Id_empresa",'Nombre_sucursal', "Telefono_sucursal"]}, 
		            {transaction: t});



    return [empresa,sucursal];

  });

  // If the execution reaches this line, the transaction has been committed successfully
  // `result` is whatever was returned from the transaction callback (the `user`, in this case)
 console.log("Hola wuapoh!!");
} catch (error) {
console.log(error);
  // If the execution reaches this line, an error occurred.
  // The transaction has already been rolled back automatically by Sequelize!

}
}





exports.happy2 = (req, res) => {
	return sequelize.transaction(async (t) => {
// chain all your queries here. make sure you return them.
  		return await Empresa.create({
			Nombre_empresa : req.body.Nombre_empresa,
			Rif_empresa : req.body.Rif_empresa,
		}, {transaction: t}).then(async (empresa) =>{
			
			var Sucursales = [];
			req.body.sucursales.forEach((item, index) => {
				Sucursales.push({
					"Nombre_sucursal": req.body.sucursales[index].Nombre_sucursal,
					"Id_empresa": empresa.Id_Empresa,
					"Telefono_sucursal" : req.body.sucursales[index].Telefono_sucursal,
				})
					console.log(Sucursales, "Arreglo aramado!!");
			});
    		console.log(empresa);
    		return Sucursal.bulkCreate(Sucursales, 
		            {fields: ["Id_empresa",'Nombre_sucursal', "Telefono_sucursal"]}, 
		            {transaction: t});
  		});
	}).then(function (result) {
  // Transaction has been committed
  // result is whatever the result of the promise chain returned to the transaction callback
	}).catch(function (err) {
		console.log(err);
  // Transaction has been rolled back
  // err is whatever rejected the promise chain returned to the transaction callback
	});
}








exports.Happy = ( req, res ) => {
	//Guarda en la bd de Postgresql
	return sequelize.transaction(  t => {

		console.log(req.body, "Este es el body");
		/*console.log(req.body.Nombre_empresa);
		console.log(req.body.Rif_empresa);
		console.log(req.body.sucursales[0].Nombre_sucursal);
		console.log(req.body.sucursales[0].Telefono_sucursal);*/
        
		return Empresa.create({
			Nombre_empresa : req.body.Nombre_empresa,
			Rif_empresa : req.body.Rif_empresa,
			//"Estado_empresa" : req.body.Estado_empresa,
		}, {transaction: t})
			.then(empresa => {

				//Crea el array
				var Sucursales = [];
				//ForEach para armar el array
				req.body.sucursales.forEach((item, index) => {
					Sucursales.push({
						"Nombre_sucursal": req.body.sucursales[index].Nombre_sucursal,
						"Id_empresa": empresa.Id_Empresa,
						"Telefono_sucursal" : req.body.sucursales[index].Telefono_sucursal,
					})
					console.log(Sucursales, "Arreglo aramado!!");
				});
				console.log(empresa.Id_Empresa, "Este es el id generado de la empresa");
				console.log("Este es el dato", sucursales);
				//BulkCreate para sucursales
		 		return Sucursal.bulkCreate(Sucursales, 
		            {fields: ["Id_empresa",'Nombre_sucursal', "Telefono_sucursal"]}, 
		            {transaction: t});
		});
		}).then(empresa => {
			//Envia la empresa creada al cliente
			res.json(empresa);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error ", details : err})
		});

		/* Empresa.create({
			"Nombre_empresa" : req.body.Nombre_empresa,
			"Rif_empresa" : req.body.Rif_empresa,
			"Estado_empresa" : req.body.Estado_empresa,
		}).then(empresa => {
			//Envia la empresa creada al cliente
			res.json(empresa);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error ", details : err})
		});  */
};



return sequelize.transaction(t => {

  // chain all your queries here. make sure you return them.
  return User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, {transaction: t}).then(user => {
    return user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, {transaction: t});
  });

}).then(result => {
  // Transaction has been committed
  // result is whatever the result of the promise chain returned to the transaction callback
}).catch(err => {
  // Transaction has been rolled back
  // err is whatever rejected the promise chain returned to the transaction callback
});