var fs = require('file-system');
const { Console } = require('console');


//Aqui Encripto 
const setData2= async (req, res) => {
  const clave = req.body.clave;
  const data = req.body.datos;
   
  const result = {};
  const iv = Buffer.alloc(16, 0); 
  // Defining key
  const key = crypto.scryptSync(clave, 'GfG', 24);
  for(const attributename in data){
     //Encriptar Datos 
     var mykey = crypto.createCipheriv('aes-192-cbc',  key, iv);
     var datos = mykey.update(data[attributename].toString(), 'utf8', 'hex');
     datos += mykey.final('hex');

     console.log( attributename+": "+datos); 
     
     result[attributename] = datos;
   }
  // Mandamos la respuesta
  if(res.statusCode === 200){
   res.json({message: "Datos encriptados correctamente",
             data: result});
   } else if (res.statusCode === 400){
     res.status(400).json('Error al encriptar');
   }else{
     res.status(400).send('Error al encriptar datos');
   }
  
   
};

   //Aqui Encripto 
const setData= async (req, res) => {
   const clave = req.body.clave;
   const data = req.body.datos;
    
   const result = {};
   for(const attributename in data){
      //Encriptar Datos 
      var mykey = crypto.createCipher('aes-256-ctr', clave);
      var datos = mykey.update(data[attributename].toString(), 'utf8', 'hex');
      datos += mykey.final('hex');

      console.log( attributename+": "+datos); 
      
      result[attributename] = datos;
    }
   // Mandamos la respuesta
   if(res.statusCode === 200){
    res.json({message: "Datos encriptados correctamente",
              data: result});
    } else if (res.statusCode === 400){
      res.status(400).json('Error al encriptar');
    }else{
      res.status(400).send('Error al encriptar datos');
    }
   
    
};


 //Aqui DesEncripto //
 const verData= async (req, res) => {
   const clave = req.body.clave;
   const data = req.body.datos;
     
   //Funcion para descifrar los datos
   function decrypt(text){
    var decipher = crypto.createDecipher('aes-256-ctr', clave)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }

   const result = {};
   for(const attributename in data){
    var datos = decrypt(data[attributename]);
    result[attributename] = datos;
    console.log("Data: ",decrypt(data[attributename])); 
   }
    // Mandamos la respuesta
    if(res.statusCode === 200){
      res.json({message: "Datos descifrados correctamente",
                data: result});
      } else if (res.statusCode === 400){
        return   res.status(400).end('Error al descifrar');
      }else{
        res.status(400).end('Error al descifrar datos');
      }    
};
 

 


module.exports = {
    verData,
    setData,
    setData2
}