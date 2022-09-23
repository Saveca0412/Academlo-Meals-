const dotenv = require("dotenv").config();
const { app } = require("./app");
const { initModels } = require("./models/initModels");

const { data } = require("./util/database.util");

const startServer = async () => {
  try {
    await data.authenticate();
    console.log("Base de datos Autenticada.");
    initModels();
    await data.sync();
    console.log("Datos sincronizados");
    const PORT = 3500;
    app.listen(PORT, () => {
      console.log("Aplicación lista y a la escucha!");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
