/* eslint-disable */
require('dotenv').config() //importamos dotenv  / siempre debe ser la primer linea, lo primero que se lee
const mongoose = require('mongoose')

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
// console.log(process.env);
// creamos un modelo de bd, se creasn con la primera en mayuscula
// le pasamos el monre del modelo y el esquema (es una funcion que recibe un json)
//basicamente le decimos que cree una coleccion con el nombre que le pasamos
//.Schema - plantilla
const Koder = mongoose.model("koder", new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true, //no se puede crear un dato nuevo sin este dato
            minLength: 2, //regla casada con lo reuqerido
            maxLength: 100,
        },
        lastName: {
            type: String,
            required: false,
            maxLength: 100,
        },
        email: {
            type: String,
            required: true, 
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,//podemos decirle que cumpla con una regEx
        },
        birthdate: {
            type: Date,
            required: false, 
        },
        generation: {
            type: Number,
            min: 1, 
            max: 100, 
        },
    }
))


//bd despues de /{nombre de BaseDatos}?
mongoose
    .connect(MONGO_URI)
    .then(() => {
        //aqui se trabaja porque aqui tenemos la conexion segura
        console.log('Conexion exitosa!')
        //llamamos a nuestro modelo y creamos un nuevo koder
        Koder.create({
            firstName: 'Alejandra',
            lastName: 'Calz',
            email: 'ale@gmail.com',
            birthdate: new Date("1995-11-11"),
            generation: 33,
        }).then(() => console.log('Koder creado!'))
          .catch((error) => console.error('Error al crear koder: ',error))
    })
    .catch((error) => console.error('Error al conectar BD error: ', error))


// Promesas
/*
ejecuciones asincronas, es un proceso que lleva tiempo 
    las promesas se crean en estado 
    1- pendiente - cuando nacen orecien se crean 
    2- resolve - resuleta la promesa (then)
    3- reject - rechazo la promesa (catch)


    .env = enviroment
*/