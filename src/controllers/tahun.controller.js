const db = require('../models');
import Sequelize from 'sequelize';

const Tahun = db.djublee.models.tahun;

exports.Tahuns = async (req, res) => {
  const tahun = await Tahun.findAll({
    order: [
      ['tahun', 'DESC'],
    ]
  });
  return res.render('tahun/index', {data:tahun});
};

exports.getCreate = async (req, res) => {
  const tahun = bindData(null);
  const errors = [];
  const action = "/tahun/create";
  return res.render('tahun/input', {data:tahun, errors:errors, action:action});
};

exports.postCreate = async (req, res) => {
  const tahun = bindData(req.body);
  const errors = [];
  const action = "/tahun/create";
  if (!tahun.tahun) {
    errors.push("tahun is required!");
    return res.render('tahun/input', {data:tahun, errors:errors, action:action});
  }

  let tahunExists = await Tahun.findOne({
    where: {
      tahun: tahun.tahun,
    },
  });
  if (tahunExists) {
    errors.push("Tahun already exist!");
    return res.render('tahun/input', {data:tahun, errors:errors, action:action});
  }

  try {
    let newUser = await Tahun.create({
      id:tahun.tahun,
      tahun: tahun.tahun,
      createdAt: new Date().getTime(),
    });
    return res.redirect('/tahun/');
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};

function bindData(data){
  const merk = {
    id : data != null ? data.tahun : "",
    tahun : data != null ? data.tahun : ""
  }
  return merk;
}

exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      message: 'Please provide a id for the merk you are trying to delete!',
    });
  }

  const tahun = await Tahun.findOne({
    where: {
      id:id,
    },
  });

  if (!tahun) {
    return res.status(400).send({
      message: `No tahun found with the id ${id}`,
    });
  }

  try {
    await tahun.destroy();
    return res.redirect('/tahun/');
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};

exports.getEdit = async (req, res) => {
  const { id } = req.params;
  const merk = await Merk.findOne({
    where: {
      id:id,
    },
  });
  const errors = [];
  return res.render('merk/input', {data:merk, errors:errors, action:"/merk/edit"});
};

exports.postEdit = async (req, res) => {
  const merk = bindData(req.body);
  console.log(merk);
  const errors = [];
  if (!merk.name) {
    errors.push("Nama merk is required!");
    return res.render('merk/input', {data:merk, errors:errors, action:"/merk/edit"});
  }

  const Op = Sequelize.Op
  let merkExists = await Merk.findOne({
    where: {
      id:  {
       [Op.not]: merk.id
      },
      name: merk.name,
    },
  });
  if (merkExists) {
    errors.push("Nama merk already exist!");
    return res.render('merk/input', {data:merk, errors:errors, action:"/merk/edit"});
  }

  let dataMerk = await Merk.findOne({
    where: {
      id: merk.id,
    },
  });

  try {
    dataMerk.name = merk.name;
    dataMerk.save();
    return res.redirect('/merk/');
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};
