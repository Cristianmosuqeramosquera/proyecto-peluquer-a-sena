const modelo = require('../../modelo/admin/CrearClienteModelo');


const modelo = require('../modelo/ClienteModelo');

class ClienteControlador {
    // funcion crear nuevo cliente
    static async crearCliente(req, res) {
        const { t1: tipoD, t2: numeroD, t3: nom, t4: dir, t5: tel,  t6: email, t6: contras } = req.body;
        // ------------👁️‍🗨️ validaciones👁️‍🗨️----------------
        // Validar campos vacíos❓❓❓❓❓----------------
        const errorCampos = ClienteControlador.verCampos(tipoD, numeroD, nom, dir, tel, email, contras);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }
        // Validar documento❓❓❓❓❓❓-------------------
        const erortipoD = ClienteControlador.verIde(tipoD);
        if (erortipoD) {
            return res.status(400).json({ error: erortipoD });
        }
        // Validar documento❓❓❓❓❓❓-------------------
        const erornumeroD = ClienteControlador.verIde(numeroD);
        if (erornumeroD) {
            return res.status(400).json({ error: erornumeroD });
        }
        // Validar nombres completos ❓❓❓❓❓❓❓------------
        const errornom = ClienteControlador.vernom(nom);
        if (errornom) {
            return res.status(400).json({ error: errornom });
        }
        // Validar nombres completos ❓❓❓❓❓❓❓------------
        const errordir = ClienteControlador.vernom(dir);
        if (errordir) {
            return res.status(400).json({ error: errordir });
        }
        // Validar teléfono❓❓❓❓❓❓❓-----------------------
        const errortel = ClienteControlador.verTel(tel);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }
        // Validar correo❓❓❓❓❓❓❓--------------------------
        const errorem = ClienteControlador.veremail(email);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }
        // Validar contraseña❓❓❓❓❓❓-----------------------
        const errorkey = ClienteControlador.verkey(contras);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }
        
        try {
            const result = await modelo.crearClientes(doc, name, tel, email, contra);
            res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'intenta recuperar la cuenta o inicia sesión.' });
              } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
              }
        }
        // ------------👁️‍🗨️ fin validaciones👁️‍🗨️------------
        
    }//cerrar crearcliente-------------------------------

    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
    //-------------------validaciones----------------------------
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊

    static verCampos(tipoD, numeroD, nom, dir, tel, email, contras) {
        if (!tipoD || !numeroD || !nom ||!dir || !tel || !email || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null; // no encontro campos vacios
    }//cerrar verCampos
    //validar documento
    static vertip(tipoD) {
        if (!/^\d{8,10}$/.test(tipoD)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        } else {
            return null; // Todo bien
        }
    }//cerrar documento

    //verificar numero de documento
    static vernumero(numeroD) {
        if (!/^\d{10}$/.test(numeroD)) {
            return 'El numero de documento debe tener exactamente 10 dígitos numéricos.';
        } else {
            return null; // todo bien
        }
    }
    //verificar nombres completos
    static vernom(nom) {
        const nom = /^[A-Za-z\s]{3,100}$/;
        if (!nom.test(nom)) {
            return 'Nombres y apellidos invalidos minimo 3 caracteres o maximo 100 solo letras minuscula o ]Mayuscula';
        } else {
            return null;
        }
    }
    //verificar nombres completos
    static verdir(dir) {
        const dir = /^[A-Za-z\s]{3,100}$/;
        if (!nom.test(dir)) {
            return 'Nombres y apellidos invalidos minimo 3 caracteres o maximo 100 solo letras minuscula o ]Mayuscula';
        } else {
            return null;
        }
    }
    //verificar telefono
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        } else {
            return null; // todo bien
        }
    }
    //validar correo
    static veremail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(email) || email.length > 200) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        } else {
            return null;
        }
    }//cerrar veremail
    //verificar contraseña
    static verkey(contras) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        } else {
            return null;
        }
    }
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
}//cerrar clase controlador

module.exports = ClienteControlador;