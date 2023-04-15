const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const helpers = require('./helpers')

const db = require('./config/db') //Conexion a la base de datos
//Importar la tablas de la base de datos
require('./models/Proyecto')
require('./models/Tareas')

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error))

const app = express()

app.use(express.static('public')) //para cargar los archivos de estilo
app.set('view engine', 'pug') //Habilitar el pug o engine templates
app.set('views', path.join(__dirname, './views')) //Agregar la carpeta de vistas
//Pasar vardump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump
    next()
})

app.use(bodyParser.urlencoded({extended: true})) //Leer los datos del formulario 

app.use('/', routes())

app.listen(3000)