const mongoose = require("mongoose");
const configDB = require("./config");

const url = configDB.dbClient;

mongoose.connect(url, {
  tls: true,
  // location of a local .pem file that contains both the client's certificate and key
  tlsCertificateKeyFile: configDB.tlsCertificateKeyFile,
  authMechanism: "MONGODB-X509",
  authSource: "$external",
});
var db = mongoose.connection;
db.once("open", function () {
  console.log("db connect");
});
