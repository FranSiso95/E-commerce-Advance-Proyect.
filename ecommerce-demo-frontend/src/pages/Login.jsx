import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    usuario: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:3000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formulario)
        }
      );

      const data = await response.json();

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/admin");

      } else {

        setError(data.error);

      }

    } catch (error) {

      console.log(error);

      setError("Error servidor");

    }

  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >

        <h1 className="text-white text-3xl mb-6 text-center">
          Login Admin
        </h1>

        {error && (
          <div className="bg-red-600 p-3 rounded mb-4 text-white">
            {error}
          </div>
        )}

        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={formulario.usuario}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formulario.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded text-white"
        >
          Ingresar
        </button>

      </form>

    </div>
  );
}

export default Login;