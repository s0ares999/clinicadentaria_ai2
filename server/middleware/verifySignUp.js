const db = require('../models');
const Utilizador = db.Utilizador;

checkDuplicateEmail = async (req, res, next) => {
  try {
    // Email
    const user = await Utilizador.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({
        message: "Falha! Email já está em uso!"
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: "Erro ao verificar email!"
    });
  }
};

const verifySignUp = {
  checkDuplicateEmail
};

module.exports = verifySignUp; 