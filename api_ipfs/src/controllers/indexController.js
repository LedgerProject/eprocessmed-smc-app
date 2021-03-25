const { Console } = require('console');
const IPFS = require('ipfs-core');

//IPFS
const createClient = require('ipfs-http-client');
const ipfs = createClient()
const { urlSource } = createClient

const client = createClient(new URL('http://144.91.102.69:5001'));




   //Aqui envio a IPFS //
const setData= async (req, res) => {
   const {datos } = req.body;
   
   try {
   const itera = await IPFS.create();
   const { cid } = await client.add(urlSource(datos));

   const CID = console.log( "cid: ",cid );
   
   

   for await (const file of itera.ls(cid)) {
      console.log("PATH",file.path);
      const hashURL  = file.path;
  
    
   //Mandamos la respuesta
   res.json({                          
          data:  "http://144.91.102.69:8080/ipfs/" + hashURL 
         });   
         await itera.stop();     
     }
          
   
  
   }
  catch (err) {

     return res.json(err.message);
   }
   
};


module.exports = {
    setData,
}