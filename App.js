const { MongoClient, ServerApiVersion } = require('mongodb');
const { any } = require('webidl-conversions');
const uri = "mongodb+srv://adisornsriphongthong:0953314906Get*@cluster0.0f5il8j.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
        await client.connect();

        const database = client.db('mydb');

        //await database.createCollection('employees');

        const collection = database.collection('employees');

        var myObj = [
            {
                name:"Hayoung sriphongthong",
                university:"PIM"
            },
            {
                name:"Chaewon Sriphongthong",
                university:"PIM"
            }
        ];

        /*collection.find().toArray((err, documents) => {
            var name = documents[0];

            console.log(name.name);
        });*/

        //findAll
        const result = await collection.find({ university: { $regex: 'M' } }).toArray();
        result.forEach(element => {
          console.log(element);
        });
        
        //const cursor = collection.find();
        const cursor = collection.find({});
        const documents = await cursor.toArray();

        const name = [];
        const university = [];

        var count = 0;
        documents.forEach(doc => {
            name[count] = doc.name;
            university[count] = doc.university;
            count += 1;
        });

        for(let i = 0; i < name.length; i++){
            console.log(`name: ${name[i]} university: ${university[i]}`);
        }

        /*const result = await collection.find({}, { projection: { _id: 0, university: 1 } }).toArray();

        // Extract and print the 'university' field from each document
        result.forEach(doc => {
          console.log(doc.university);
        });*/

        /*var name;
        var university;
        documents.forEach(doc => {
            name = doc.name;
            university = doc.university;
        });*/

        //console.log(`name: ${name}\ ununiversity: ${university}`);

        //await collection.insertOne(myObj);
        //await collection.insertMany(myObj);

        //console.log('Collection created');
        console.log('Collection Inserted');

        //query
        //const result = await collection.find({ name: 'Adisorn sriphongthong' }).toArray();
    } finally {
        await client.close();
    }
}

/*async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      
      // Get a reference to the database
      const database = client.db("mydb");
  
      // Create a collection
      await database.createCollection("customers");
      
      console.log("Collection created!");
    } finally {
      // Ensure that the client will close when you finish/error
      await client.close();2130
    }
}*/
run().catch(console.dir);

