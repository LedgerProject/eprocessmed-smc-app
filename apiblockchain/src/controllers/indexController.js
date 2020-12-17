const { Pool } = require('pg')

//Configuracion Acceso al Nodo Blockchain
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');
const rpcURL = "";
const provider = new Web3.providers.HttpProvider();
const web3 = new Web3(rpcURL);
const crypto = require('crypto');
var fs = require('file-system');
const { Console } = require('console');
var keccak256 = require('js-sha3').keccak256;


//Configuracion de acceso a Contrato

const contractAddress = '';
const contractABI = [{"constant": true,"inputs": [],"name": "nextId","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],	"name": "consentimiento","outputs": [{"name": "id","type": "uint256"	},{	"name": "ids","type": "uint256"	},{"name": "pdf","type": "string"	},	{	"name": "establishment","type": "string"},{"name": "specialist","type": "string"},{"name": "patient","type": "string"	},{"name": "process","type": "string"},{"name": "creation_date","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "id","type": "uint256"	}],"name": "destroy","outputs": [],"payable": false,	"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "ids","type": "uint256"},{"name": "pdf","type": "string"},{"name": "establishment",	"type": "string"},{"name": "specialist","type": "string"},{"name": "patient","type": "string"},{"name": "process","type": "string"},{"name": "creation_date","type": "string"}],"name": "create","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "ids","type": "uint256"}],"name": "read","outputs": [{"name": "","type": "uint256"},{"name": "","type": "string"},{"name": "","type": "string"},{"name": "","type": "string"},{"name": "","type": "string"},{"name": "","type": "string"},{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "ids","type": "uint256"},{"name": "pdf","type": "string"}],"name": "update","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}];
const contract = new web3.eth.Contract(contractABI, contractAddress);




//Configuracion de acceso a la base de datos
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'consent',
    port: '5432'
})

//Aqui obtengo la lista de los consetimientos desde PostGres
const getConsent = async (req, res) =>{
   
    // Consulta a la BD
   const response = await  pool.query('SELECT * FROM consent');
   
   
   
   
   const data = await  response.rows;
   data.forEach( (row) => {
   
   const  respuesta = {
    "id": row.ids,
    "pdf":row.pdf,
    "establishment": row.establishment,
    "specialist": row.specialist,
    "patient": row.patient,
    "process": row.process,
    "creation_date": row.creation_date,
    "hash_centro": "https://blkexplorer1.telsius.alastria.io/transaction/"+row.hash_consent
                   };          
                   console.log(respuesta);   

   });
    
  
   res.json(data);
  
   
   
  
  
   
}

//Obtener Consentimientos por HASH
const getConsentByHash = async (req, res) =>{
   const HashID = req.params.hash_consent;
   
 
    const response =  await pool.query('SELECT * FROM consent WHERE hash_consent = $1 ', [HashID]);
  
   //Funcion para descifrar los datos
    function decrypt(text){
      var decipher = crypto.createDecipher('aes-128-cbc', 'clavecifrado')
      var dec = decipher.update(text,'hex','utf8')
      dec += decipher.final('utf8');
      return dec;
    }
   const respuesta = response.rows;  
   for (var i = 0; i < respuesta.length; i++) {

      var row = respuesta[i];
      ids = respuesta[i].ids;
      pdf = respuesta[i].pdf;
      establishment = respuesta[i].establishment;
      specialist = respuesta[i].specialist;
      patient0 = respuesta[i].patient;
      patient = decrypt(patient0.toString());
      process = respuesta[i].process;
      creation_date = respuesta[i].creation_date;
      hash_consent = respuesta[i].hash_consent;
      
     console.log(decrypt(patient0.toString()));
    
  
      res.json({
         "ids":ids,
         "pdf":pdf,
         "establishment":establishment,
         "specialist":specialist,
         "patient":patient,
         "process":process,
         "creation_date":creation_date,
         "hash_consent": "https://blkexplorer1.telsius.alastria.io/transaction/"+hash_consent
      });
   } 
 
 
 }


   //Aqui creo los Consentimiento //
const setConsent = async (req, res) => {
   const {ids, pdf, establishment, specialist, patient, process, creation_date } = req.body;
   

   //Encriptar Datos 
   var mykey = crypto.createCipher('aes-128-cbc', 'clavedecifrado');
   var encr_patient = mykey.update(patient, 'utf8', 'hex')
   encr_patient += mykey.final('hex');

   console.log("ENCRIPTADO: "+encr_patient); 

   //Cuenta 
   const account = "";
   
   //Clave privada
   const privateKey = Buffer.from(
    '',
    'hex',
  )

   //Creamos los datos en la cadena de bloques, el Hash resultante capturamos y almacenamos en Postgress
   
   const datos = contract.methods.create(ids, pdf, establishment, specialist, patient, process, creation_date ).encodeABI();
   
   web3.eth.getTransactionCount(account, (err, txCount) => {  

    //Construccion del envio
    const envio = {
      nonce:    0,
      gasLimit: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('0', 'Gwei')),
      to: contractAddress,
      data: datos     
    };


     // Configuracion personalizada de Nodos Privados
    const Common = require('ethereumjs-common').default;
      const customCommon = Common.forCustomChain(
         'mainnet',
         {
            name: 'alastria',
            chainId: 83584648538,
         },
        // 'homesteadBlock',
      );

 
    //Firmamos localmente la transaccion
    const tx = new Tx(envio , { Common: customCommon });
    tx.sign(privateKey);
    
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

   

    // Broadcast de la transaccion
    const receipt = web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    
   


    //Agregamos a postgres el Hash
    const response =  pool.query('INSERT INTO consent (ids, pdf, establishment, specialist, patient, process, creation_date, hash_consent ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)' , [ids, pdf, establishment, specialist, encr_patient, process, creation_date, txHash]);

    //Mandamos la respuesta
    res.json({
        message: 'El Consentimiento fue creado correctamente',
                body:{
                   consentimiento: {ids, pdf, establishment, specialist, encr_patient, process, creation_date},
                   hash: {txHash}
    
                }
           })  
  
     })  
  });
};

//Aqui obtengo la lista de las transacciones desde PostGres
const getTransacciones = async (req, res) =>{
   const response = await  pool.query('SELECT * FROM transacciones');
   console.log(response.rows);
   res.json(response.rows);
};

  

 // ** Aqui creo los TRANSACCIONES **//
 const setTransacciones = async (req, res) => {
   const {id_centroT, hash_centro, pdf } = req.body;
     

    
   //Cuenta 
   const account = "";
   
   //Clave privada
   const privateKey = Buffer.from(
    '',
    'hex',
  )

   //Creamos el *id_centro y el *nombre_centro en la cadena de bloques, el Hash resultante capturamos y almacenamos en Postgress
   
   const datos = contract.methods.createTransacciones(id_centroT, hash_centro, pdf ).encodeABI();
   
   web3.eth.getTransactionCount(account, (err, txCount) => {  

    //Construccion del envio
    const envio = {
      nonce:    0,
      gasLimit: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('0', 'Gwei')),
      to: contractAddress,
      data: datos     
    };

    
     // Configuracion personalizada de Nodos Privados
    const Common = require('ethereumjs-common').default;
      const customCommon = Common.forCustomChain(
         'mainnet',
         {
            name: 'alastria',
            chainId: 83584648538,
         },
        // 'homesteadBlock',
      );

 
    //Firmamos localmente la transaccion
    const tx = new Tx(envio , { Common: customCommon });
    tx.sign(privateKey);
    
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

   

    // Broadcast de la transaccion
    const receipt = web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    
   

    // Agregamos a postgres el Hash
    const response =  pool.query('INSERT INTO transacciones (id_centro, hash_centro, pdf ) VALUES ($1, $2, $3)' , [id_centroT, hash_centro, txHash]);

    //Mandamos la respuesta
    res.json({
        message: 'La Transacciones fue creada exitosamente',
                body:{
                   centro: {id_centroT, hash_centro},
                   hash: {txHash}
    
                }
           })  
  
     })  
  });
};


module.exports = {
    getConsent,
    setConsent,
    getConsentByHash,
    setTransacciones,
    getTransacciones
}