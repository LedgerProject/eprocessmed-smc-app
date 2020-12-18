const mongoose = require('mongoose');
const frmSch = require('./schema/frmSch');
const FrmMdl = mongoose.model('campmonitor', frmSch);

var global_data = require('../../../global/global_data');

const frmSrv = {};

frmSrv.list = async (req, res) => {
  await FrmMdl.find({}, (err, doc) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: err
      });
    }

    res.json({
      ok: true,
      resp: doc
    });
  })
};

frmSrv.save = async (req, res) => {
  let { pool } = req.params;

  console.log(pool);

  // const frm = new FrmMdl(pool);
  // await frm.save({}, (err, doc) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       resp: err
  //     });
  //   }

  //   res.json({
  //     ok: true,
  //     resp: doc
  //   });
  // })

};

frmSrv.sv = async (pool) => {

  console.log(pool);

  let camp = [pool];

  const frm = new FrmMdl(pool);
  await frm.save({}, (err, doc) => {
    console.log(err);
    console.log(doc);
    
    // if (err) {
    //   return res.status(400).json({
    //     ok: false,
    //     resp: err
    //   });
    // }

    // res.json({
    //   ok: true,
    //   resp: doc
    // });

  })

};

//Leer datos a editar
frmSrv.getdate = async (req, res) => {
  let { item, val } = req.params,
      bin = `${item}: ${val}`;

  await FrmMdl.find({ bin }, (err, doc) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: err
      });
    }

    res.json({
      ok: true,
      resp: doc
    });

  })

  // await FrmMdl.findById({val}, (err, doc) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       resp: err
  //     });
  //   }

  //   res.json({
  //     ok: true,
  //     resp: doc
  //   });

  // })

};

//Editar
frmSrv.upDate = async (req, res) => {
  // let { id } = req.params,
  //     { pool } = req.params,
  //     data = JSON.parse(pool);

  const { id } = req.params;
  await FrmMdl.upDate({_id: id}, req.body, (err, doc) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: err
      });
    }

    res.json({
      ok: true,
      resp: doc
    });
  })
};

frmSrv.delete = async (req, res) => {
  let { id } = req.params;
  await FrmMdl.deleteOne({_id: id}, (err, doc) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: err
      });
    }

    res.json({
      ok: true,
      resp: doc
    });
  })
}

//Borrar toda la colección
frmSrv.dltColl = async (req, res) => {
  await FrmMdl.deleteMany({}, (err, doc) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: err
      });
    }

    res.json({
      ok: true,
      resp: doc
    });
  });
}

/*** De Control ***/

//Cambia el status
frmSrv.onoff = async (req, res) => {
  // let { id } = req.params,
  //     { estatus } = req.params;

  let { id } = req.params;
  const evtsMonitor = await FrmMdl.findById(id);
  evtsMonitor.statusCamp = !evtsMonitor.statusCamp;
  const resp = await evtsMonitor.save()
  .then(resp => res.json(resp))
  .catch(err => console.log(err));
};

module.exports = frmSrv;