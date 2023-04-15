const Proyecto = require('../models/Proyecto')

exports.proyectosHome = async (req, res) =>{
    const proyectos = await Proyecto.findAll() //Es igual al SELECT * FROM 'proyecto'
    
    res.render('index', {
        nombrePagina: 'Proyectos', proyectos
    })
}

exports.formularioProyecto = async (req, res) =>{
    const proyectos =  await Proyecto.findAll()
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto', proyectos
    })
}

exports.nuevoProyecto = async (req, res) =>{
    const proyectos =  await Proyecto.findAll()
    //validar los datos del formulario
    const { nombre } = req.body

    let errores = []
    if(!nombre){
        errores.push({'texto': 'Agrega un puto proyecto'} )
    }

    //si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevo Proyecto', 
            errores, proyectos
        })
    }else{
        //Insertar a la base de datos
        const proyecto =  await Proyecto.create({ nombre })
        res.redirect('/') //Re dirige al home
    }
}

exports.proyectoPorUrl = async(req, res, next) =>{
    const proyectosPromise = Proyecto.findAll()  
    
    const proyectoPromise = Proyecto.findOne({
        where:{
            url: req.params.url
        }
    })

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    if(!proyecto) return next()
    
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto', proyecto, proyectos
    })
}

exports.formularioEditar = async (req, res) =>{
    const proyectosPromise = Proyecto.findAll()

    const proyectoPromise = Proyecto.findOne({
        where:{
            id: req.params.id
        }
    })

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    res.render('nuevoProyecto',{
        nombrePagina: 'Editar Proyecto', proyectos, proyecto
    })
}

exports.actualizarProyecto = async (req, res) =>{
    const proyectos =  await Proyecto.findAll()
    //validar los datos del formulario
    const { nombre } = req.body

    let errores = []
    if(!nombre){
        errores.push({'texto': 'Agrega un puto proyecto'} )
    }

    //si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina: 'Nuevo Proyecto', 
            errores, proyectos
        })
    }else{
        //Actualizar a la base de datos
        const proyecto =  await Proyecto.update(
            { nombre: nombre },
            { where: {id: req.params.id} }
            )
        res.redirect('/') //Re dirige al home
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    const {urlProyecto} = req.query

    const resultado = await Proyecto.destroy({where: {url: urlProyecto}})

    if(!resultado){
        return next()
    }

    res.status(200).send('Your file has been deleted')
}