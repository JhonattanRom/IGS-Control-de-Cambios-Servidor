module.exports = function(app) {
	const controlCambio = require('../controller/controlCambio.controller.js');

	//Crea un nuevo Servicio
	app.post('/api/controlCambio', controlCambio.create);

	//Lista todos los sericios
	app.get('/api/controlCambio', controlCambio.findAll);
	//Lista todos los sericios
	app.get('/api/controlCambio', controlCambio.findAll);
	
	//Obtiene un Servicio por Id
	app.get('/api/controlCambio/:id', controlCambio.findById);
	//Actualiza un servicio por Id 
	app.put('/api/controlCambio/', controlCambio.update);

	//Realiza planificacion de control de cambio
	app.put("/api/controlCambio/planificar/:id", controlCambio.updatePlanificacion)

	//Realiza evaluacion de control de cambio
	app.put("/api/controlCambio/Evaluar", controlCambio.EvaluarCambio)

	//Finaliza la ejecucion del control de cambio
	app.put("/api/controlCambio/Finalizar", controlCambio.FinalizarCambio)

	//Ejecuta el control de cambio
	app.put("/api/controlCambio/Ejecutar", controlCambio.Ejecutar);
	
	//Buscar y agrupar controles de cambio por mes
	app.get("/api/PresentYearcontrolCambio/presente", controlCambio.CcPresentYear);

	//Buscar y agrupar controles de cambio del pasado
	app.post("/api/LastYearcontrolCambio/pasado", controlCambio.CcLastYear);

	//Buscar Lista de servicios mas solicitados en controles de cambio
	app.get("/api/ListadoCCservicios", controlCambio.CCserviciosSolicitados);

	//Buscar y litsar la cantidad de prioridades en controles de cambio
	app.get("/api/ListadoCCPrioridades", controlCambio.CCprioridades);
	
	//Busqueda de data para contadores
	app.get("/api/Contadores", controlCambio.CCcontadores);

	//Actualiza planificacion
	app.put("/api/UpdatePlanificacion/:id", controlCambio.ActualizarPlanificacion);

/*
	//Borra un servicio por Id
	app.delete('/api/empresas/:id', empresas.delete);	 */
}