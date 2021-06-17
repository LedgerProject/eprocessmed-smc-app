const fs = require('fs');
const crypto = require('crypto');
const hashAlgorithm = 'sha256';
const algorithm = 'aes-256-cbc';

const cryptographer = { };

const encrypt = async (data) => {
    let answer;
    try {
        const bufferFile = await fs.readFileSync(data.fileUrl);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(data.key), data.iv);
        let encrypted = cipher.update(bufferFile);

        encrypted = Buffer.concat([encrypted, cipher.final()]);
        answer = { iv: data.iv.toString('hex'), encryptedData: encrypted.toString('hex') };

    } catch(e) {
        answer = e.stack;
    }
    return answer;
};

const decrypt = (data) => {
    let answer = {
        correct: false,
        resp: ''
    };
    try {// Separar función de encriptación individual y llamar por "map"
        const iv = Buffer.from(data.iv, 'hex');       
        const encryptedText = Buffer.from(data.encryptedData, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(data.key), iv);
        let decrypted = decipher.update(encryptedText);   
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        answer = decrypted;
        
    } catch (e) {

        answer = e.stack;

    }

    return answer;
};

cryptographer.encrypt = async (data) => {
    const encryptResp = await encrypt(data);
    return encryptResp;
};

cryptographer.decrypt = async (data) => {
    const decryptResp = await decrypt(data);
    return decryptResp;
};

cryptographer.remoteEncrypt = async (req, res) => {
    const data = req.body;
    let status = 400;
    let correct = false;
    let answer;

    const encryptResp = await encrypt(data);
  
    res.status(200).json(encryptResp);
};

cryptographer.remoteDecrypt = async (req, res) => {
    const data = req.body;

    const decryptResp = await encrypt(data);

    res.status(200).json({
        correct: true,
        resp: decryptResp
    });
}

module.exports = cryptographer;