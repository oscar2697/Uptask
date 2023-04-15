const Proyectos = require('../models/Proyecto')
const Tareas =  require('../models/Tareas')

exports.agregarTarea = async (req, res, next) => {
    const proyecto =  await Proyectos.findOne({ where: { url: req.params.url } }) //obtener el proyecto actual

    const {tarea} = req.body
    //Estado incompleto
    const estado = 0
    const proyectoId = proyecto.id
    //Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId })

    if(!resultado){
        return next()
    }
    //redirecionar
    res.redirect(`/proyectos/${req.params.url}`)
}