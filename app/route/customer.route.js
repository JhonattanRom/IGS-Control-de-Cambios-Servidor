module.exports = function(app) {
	const customers = require('../controller/customer.controller.js');

	//Create a new Customer 
	app.post('/api/customers', customers.create);

	//Retrieve all Customers 
	app.get('/api/customers', customers.findAll);

	//Retrieve a single Customer by Id
	app.get('/api/customers', customers.findById);

	//Update a Customer by Id
	app.put('/api/customers', customers.update);

	//Delete a Customer by Id
	app.delete('/api/customers', customers.delete);
}