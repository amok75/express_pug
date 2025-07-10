const { MongoClient, ServerApiVersion } = require("mongodb");
const configDB = require("./config");

const credentials = "./cert/X509-cert-3924642680346106443.pem";
const client = new MongoClient(configDB.dbClient, {
  tlsCertificateKeyFile: configDB.tlsCertificateKeyFile,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");
    const docCount = await collection.countDocuments({});
    console.log("Count:", docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
