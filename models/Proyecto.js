const Sequelize = require('sequelize')
const db = require('../config/db')
const slug = require('slug')
const shortid = require('shortid')

const Proyecto = db.define('proyecto',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
},{
    hooks:{ //Para generar las url de cada proyecto
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase()

            proyecto.url = `${url}-${shortid.generate()}`//shortid genera un id diferencial de cada proyecto que se repita o tenga el mismo nombre
        }
    }
})

module.exports = Proyecto
