const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { router: productsRouter } = require('./routes/products');
const { router: authRouter } = require('./routes/auth');
const { checkToken } = require('./middlewares/jwt-validate');

const app = express();
const PORT = 4000;

//Carpeta Public para archivos Front End estaticos
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Solo en desarrollo
app.use(cors());

app.use('/products', productsRouter);

app.use('/auth', authRouter);

app.get('/ping', checkToken, function(req, res) {
	return res.send('Pong con Token valido');
});

app.listen(PORT, function() {
	console.log(`El servidor quedo corriendo en el puerto ${PORT}`);
});
