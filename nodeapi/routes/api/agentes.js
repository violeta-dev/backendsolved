var express = require('express');
const multer = require('multer');
var router = express.Router();
const Agente = require('../../models/Agente');

// const upload = multer({ dest: 'uploads/'});
const storage = multer.diskStorage({
  destination: function( req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    const myFilename = `agente_${file.fieldname}_${Date.now()}_${file.originalname}`;
    cb(null, myFilename);
  }
});
const upload = multer({ storage: storage });

/* GET /api/agentes */
router.get('/', async function(req, res, next) {
  try {

    console.log('El usuario logado tiene el _id:', req.apiAuthUserId);

    // http://localhost:3000/api/agentes?name=Smith
    const name = req.query.name;
    // http://localhost:3000/api/agentes?age=36
    const age = req.query.age;

    // http://localhost:3000/api/agentes?limit=2
    const limit = parseInt(req.query.limit || 10);
    // http://localhost:3000/api/agentes?skip=20&limit=10
    const skip = parseInt(req.query.skip);

    // http://localhost:3000/api/agentes?sort=age
    // http://localhost:3000/api/agentes?sort=age name
    const sort = req.query.sort;

    // http://localhost:3000/api/agentes?fields=age%20-_id
    const fields = req.query.fields;

    const filtro = {};

    if (name) {
      filtro.name = name;
    }

    if (age) {
      filtro.age = age;
    }

    const agentes = await Agente.lista(filtro, limit, skip, sort, fields);
    res.json(agentes);
  } catch (err) {
    next(err);
  }
});

/* GET /api/agentes/<_id> */
router.get('/:_id', async (req, res, next) => {
  try {

    const _id = req.params._id;

    const agente = await Agente.findOne({ _id: _id});

    res.json({ result: agente });

  } catch(err) {
    next(err);
  }
});

/* POST /api/agentes */
router.post('/', async (req, res, next) => {
  try {
    const agenteData = req.body;

    // creamos el documento en memoria
    const agente = new Agente(agenteData);

    // lo guardamos en BD
    const agenteGuardado = await agente.save();

    res.json({ result: agenteGuardado });

  } catch (err) {
    next(err);
  }
});

/* PUT /api/agentes/:_id */
router.put('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const agenteData = req.body;

    const agenteGuardado = await Agente.findOneAndUpdate({ _id: _id}, agenteData, {
      new: true,
      useFindAndModify: false // para evitar warning de deprecated
    });

    res.json({ result: agenteGuardado });

  } catch (err) {
    next(err);
  }
});

/* DELETE /api/agentes/:_id */
router.delete('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;

    await Agente.deleteOne({ _id: _id });

    res.json();
  } catch (err) {
    next(err);
  }
});

router.post('/upload', upload.single('imagen'), (req, res, next) => {
  console.log(req.file);
  res.send('ok');
});

module.exports = router;
