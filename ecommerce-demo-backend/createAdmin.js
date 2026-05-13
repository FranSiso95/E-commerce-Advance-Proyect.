require("dotenv").config();

const bcrypt = require("bcryptjs");
const connection = require("./config/db");

const crearAdmin = async () => {

  const usuario = "admin";

  const passwordPlano = "1234";

  const passwordHash = await bcrypt.hash(passwordPlano, 10);

  const query = `
    INSERT INTO admins (usuario, password)
    VALUES (?, ?)
  `;

  connection.query(
    query,
    [usuario, passwordHash],
    (error, result) => {

      if (error) {
        console.log(error);
        return;
      }

      console.log("Admin creado correctamente 🔥");

      process.exit();

    }
  );

};

crearAdmin();