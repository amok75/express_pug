module.exports = {
  keySession: ["TWOJKLUCZ"],
  maxAgesession: 24 * 60 * 60 * 1000,
  dbClient:
    "mongodb+srv://cluster0.tswdef7.mongodb.net/test?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0",
  tlsCertificateKeyFile: "./cert/X509-cert-3924642680346106443.pem",
};
