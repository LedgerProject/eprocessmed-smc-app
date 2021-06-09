const venom = require('venom-bot');

const notificacion = async (req, res) => {
   const numero = req.body.numero;
   const nombre = req.body.nombre;
   const mensaje = req.body.mensaje;
   let message = nombre+', '+mensaje;
  
   try {
    venom.create('pacientes').then((paciente) => { paciente.sendText(numero+'@c.us', message)});
    res.json({result :"Mensaje Enviado", 
      telefono: numero, 
      mensaje: message
      });   
      } catch (err) {
          res.json({result :"ERROR"
          });
      }

};


module.exports = {
    notificacion
}