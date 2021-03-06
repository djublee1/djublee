const db = require('../models');
import Sequelize from 'sequelize';

const Merk = db.djublee.models.merk;

exports.Merks = async (req, res) => {
  const merk = await Merk.findAll();
  return res.render('merk/index', {data:merk});
};

exports.getCreate = async (req, res) => {
  const merk = bindData(null);
  const errors = [];
  return res.render('merk/input', {data:merk, errors:errors, action:"/merk/create"});
};

exports.postCreate = async (req, res) => {
  const merk = bindData(req.body);
  const errors = [];
  if (!merk.name) {
    errors.push("Nama merk is required!");
    return res.render('merk/input', {data:merk, errors:errors, action:"/merk/create"});
  }

  let merkExists = await Merk.findOne({
    where: {
      name: merk.name,
    },
  });
  if (merkExists) {
    errors.push("Nama merk already exist!");
    return res.render('merk/input', {data:merk, errors:errors, action:"/merk/create"});
  }

  try {
    let newUser = await Merk.create({
      name: merk.name,
      createdAt: new Date().getTime(),
    });
    return res.redirect('/merk/');
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`,
    });
  }
};

function bindData(data){
  const merk = {
    id : data != null ? data.id : "",
    name : data != null ? data.name : ""
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

  const merk = await Merk.findOne({
    where: {
      id:id,
    },
  });

  if (!merk) {
    return res.status(400).send({
      message: `No merk found with the id ${id}`,
    });
  }

  try {
    await merk.destroy();
    return res.redirect('/merk/');
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
