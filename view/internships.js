//connect to mongodb
const { MongoClient } = require("mongodb");
const db = "mongodb://vibecards:4rFvbgt256yhn@localhost:27017/admin";
const client = new MongoClient(db);
const database_env = "internlink";
const col_env = "internships";

async function get_all_internships(uid) {
    try {
        await client.connect(); // Ensure the client is connected
        const db = client.db(database_env);
        const col = db.collection(col_env);
        const query = { uid: uid };
        
        const result = await col.find(query).toArray();
        console.log(result)
        return { status: "true", message: "success", result: result };
    } catch (err) {
        return { status: "false", message: err };
    }
}


async function add_internship(req) {
    try {
        // connect to the database
        const db = client.db(database_env)
        const col = db.collection(col_env)

        console.log("gothere")
        // hash the password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.password, salt);
        // prepare the user object with the hashed password
        const user = {
            uid: req.uid,
            title: req.title,
            company: req.company,
            duration: req.duration,
            image: req.image
        };

        // insert the user into the database
        const result = await col.insertOne(user);
        if (result.insertedCount > 0) {
            return { status: "true", message: "Internship added successfully!" };
        } else {
            return { status: "false", message: "Failed to add internship" };
        }
    } catch (err) {
        console.error(err);
        return { status: "false", message: err };
    }
}


module.exports = { add_internship, get_all_internships };