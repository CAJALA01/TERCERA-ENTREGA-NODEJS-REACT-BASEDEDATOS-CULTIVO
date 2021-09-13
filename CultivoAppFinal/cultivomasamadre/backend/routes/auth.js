const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');

const { checkToken } = require('../middlewares/jwt-validate');

const router = express.Router();


// Registro de Usuario 

router.post('/register', async (req, res) => {

    if (req.body.mail && req.body.name && req.body.password) {

        // Formato del mail
        if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
            res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
            return
        }

        // Chequear que Email no exista en la Base de Datos
        let usersDatabase = await database.query('SELECT id FROM users WHERE mail = $1', [req.body.mail]);

        const existingUser = usersDatabase.rowCount > 0;

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email repetido' });
        }

        // Usuario Correcto, Agregamos el Usuario. 
        // Encriptacion Hash contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const newUser = {
            name: req.body.name,
            lastName: req.body.lastName,
            ci: req.body.ci,
            mail: req.body.mail,
            password: password
        }

        // Insertarlo en la Base de Datos 
        await database.query(
            'INSERT INTO users(name, lastName, ci, mail, password) VALUES ($1, $2, $3, $4, $5)',
            [newUser.name, newUser.lastName, newUser.ci, newUser.mail, newUser.password]
        );

        return res.status(200).json({ success: true, newUser});

    }
    else {
        return res.status(400).json({ success: false, message: 'Faltan datos (requeridos: mail, name, password)' });
    }
});

// Login de Usuario 

router.post('/login', async (req, res) => {

    // Buscamos el usuario con el mismo mail en la Base de Datos
    let usersDatabase = await database.query('SELECT id, mail, password FROM users WHERE mail = $1', [req.body.mail]);

    if (usersDatabase.rowCount === 0) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = usersDatabase.rows[0]; //Usuario Existe
    console.log('Usuario: ', user);

    const validPassword = await bcrypt.compare(req.body.password, user.password); //Compara la Password ingresada vs Password en Base de Datos
    if (!validPassword) {
        return res.status(400).json({ error: 'Contraseña no válida' });
    }

    // Crear el token JWT
    const token = jwt.sign({
        id: user.id,              
        mail: user.mail
    }, process.env.SecretToken);  

    res.status(200).json({ error: null, data: 'Login exitoso', token });
});

//Listar usuarios sólo con acceso de Administrador 
router.get('/users', checkToken, async (req, res) => {

    let usersDatabase = await database.query('SELECT id, mail, name, lastName FROM users', []);

    if (usersDatabase.rowCount === 0) {
        return res.status(400).json({ error: 'No hay Usuarios' });
    }

    if (adminUsers.includes(req.user.mail)){
        return res.json({ error: null, users: usersDatabase.rows, userInReq: req.user });
    }
    
    return res.status(403).json({ error: 'No tienes permisos para realizar la operacion' });
});



// Envio de informacion en FORMULARIO DE CONTACTO

router.post('/contactform', async (req, res) => {

    if (req.body.mailcontact && req.body.telephone && req.body.message) {

        // Formato del mail
        if (/^\S+@\S+\.\S+$/.test(req.body.mailcontact) === false) {
            res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
            return
        }

        const newMessage = {
            mailcontact: req.body.mailcontact,
            telephone: req.body.telephone,
            message: req.body.message,
        }

        messageform.push(newMessage)

        return res.status(200).json({ success: true, messages: messageform});

    }
    else {
        return res.status(400).json({ success: false, message: 'Faltan datos (requeridos: mail, telefono, mensaje)' });
    }
});


module.exports = {
    router: router
};


// USUARIO ADMINISTRADOR PARA OBTENER LISTA DE USERS
const adminUsers = [
    "aguscajal@mail.com"
];
 
const messageform = [

];