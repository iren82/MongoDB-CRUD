const express = require('express');  /* Llamamos al paquete Express */
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mdbReader:mdbReader@666@irensandbox.cfkpl.mongodb.net/<dbname>?retryWrites=true&w=majority";

MongoClient.connect(uri, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('DB Online, servidor conectado')
    const db = client.db('mDB-crud')
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))    /*Toma los datos del form y los manda al body*/

    app.post('/quotes', (req, res) => {                 /* Lee el POST desde el FORM y lo inserta en la DB*/
        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
            .then(results => {
                res.render('index.ejs', {
                    quotes: results
                })
            })
            .catch()
    })
    app.put('/quotes', (req, res) => {        // Trae el dato que manda el PUT y ejecuta el update en la DB
        quotesCollection.findOneAndUpdate({
                Nombre: 'Nico'
            }, {
                $set: {
                    Nombre: req.body.Nombre,
                    Texto: req.body.Texto
                }
            }, {
                upsert: true
            })
            .then(result => {
                res.json('Se modificó el documento')
                })
            .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne({
                Nombre: req.body.Nombre
            })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('Cero documentos')
                }
                res.json('Borrado documento de '+req.body.Nombre)
            })
            .catch(error => console.error(error))
    })
    //app.use( /* ... */ )
    //app.get( /* ... */ )
    //app.post( /* ... */ )
    //app.listen( /* ... */ )
});


app.listen(3000, function () {                      /* Abre el server en el puerto 3000 */
    console.log('Server abierto en puerto 3000')
})

