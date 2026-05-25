require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const upload = require("./config/multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verificarToken = require("./middlewares/auth");
const fs = require("fs");

const app = express();

app.use(cors());

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.post("/login", express.json(), (req, res) => {

  const { usuario, password } = req.body;

  const query = `
    SELECT * FROM admins
    WHERE usuario = ?
  `;

  connection.query(
    query,
    [usuario],
    async (error, results) => {

      if (error) {

        return res.status(500).json({
          error: "Error servidor"
        });

      }

      if (results.length === 0) {

        return res.status(401).json({
          error: "Usuario no encontrado"
        });

      }

      const admin = results[0];
      
      console.log(admin.password);

      const passwordCorrecta =
        await bcrypt.compare(
          password,
          admin.password
        );


      if (!passwordCorrecta) {

        return res.status(401).json({
          error: "Contraseña incorrecta"
        });

      }

      const token = jwt.sign(

        {
          id: admin.id,
          usuario: admin.usuario
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      );

      res.json({
        mensaje: "Login correcto",
        token
      });

    }
  );
});


// GET PRODUCTOS
app.get("/productos", (req, res) => {

  const query = "SELECT * FROM productos";

  connection.query(query, (error, results) => {

    if(error){
      console.log(error);

      return res.status(500).json({
        error: "Error al obtener productos"
      });
    }

    res.json(results);

  });

});


// POST PRODUCTOS
app.post("/productos", verificarToken, upload.single("imagen"), (req, res) => {

  const {
    nombre,
    descripcion,
    precio,
    stock,
    categoria
  } = req.body;

  const imagen = req.file
  ? `https://e-commerce-advance-proyect.onrender.com/uploads/${req.file.filename}`
  : "";

  const query = `
    INSERT INTO productos
    (nombre, descripcion, precio, stock, imagen, categoria)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [nombre, descripcion, precio, stock, imagen, categoria],
    (error, result) => {

      if(error){
        console.log(error);

        return res.status(500).json({
          error: "Error al crear producto"
        });
      }

      res.json({
        mensaje: "Producto creado correctamente",
        id: result.insertId
      });

    }
  );

});

// DELETE PRODUCTOS
app.delete("/productos/:id", verificarToken, (req, res) => {

  const { id } = req.params;

  const query = "DELETE FROM productos WHERE id = ?";

  connection.query(query, [id], (error, result) => {

    if(error){
      console.log(error);

      return res.status(500).json({
        error: "Error al eliminar producto"
      });
    }

    res.json({
      mensaje: "Producto eliminado correctamente"
    });

  });

});

// UPDATE PRODUCTOS
app.put("/productos/:id", verificarToken, upload.single("imagen"), (req, res) => {

  const { id } = req.params;

  const {
    nombre,
    descripcion,
    precio,
    stock,
    categoria
  } = req.body;

  const imagen = req.file
    ? `https://e-commerce-advance-proyect.onrender.com/uploads/${req.file.filename}`
    : req.body.imagen;

  const query = `
    UPDATE productos
    SET
      nombre = ?,
      descripcion = ?,
      precio = ?,
      stock = ?,
      imagen = ?,
      categoria = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      categoria,
      id
    ],
    (error, result) => {

      if(error){
        console.log(error);

        return res.status(500).json({
          error: "Error al actualizar producto"
        });
      }

      res.json({
        mensaje: "Producto actualizado correctamente"
      });

    }
  );

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});