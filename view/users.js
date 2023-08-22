//connect to mongodb
const { MongoClient } = require("mongodb");
const db = "mongodb://vibecards:4rFvbgt256yhn@localhost:27017/admin";
const client = new MongoClient(db);
const database_env = "internlink";
const col_env = "users";

async function get_all_users(req) {
    try {
        const db = client.db(database_env)
        const col = db.collection(col_env)
        const result = await col.find().toArray()
        return { status: "true", message: "success", result: result }
    } catch { err } {
        return { status: "false", message: err }
    }
}

async function check_user(req) {
    try {
        const db = client.db(database_env)
        const col = db.collection(col_env)
        const result = await col.findOne({ username: req.username, password: req.password })
        console.log(result)
        return { status: "true", message: "success", result: result }
    } catch { err } {
        return { status: "false", message: err }
    }
}


async function create_user(req) {
    try {
        // connect to the database
        const db = client.db(database_env)
        const col = db.collection(col_env)

        // hash the password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.password, salt);
        const uid = Math.random().toString(36).substr(2, 8).toUpperCase();
        // prepare the user object with the hashed password
        const user = {
            uid: uid,
            type: req.type,
            firstName: req.firstName,
            lastName: req.lastName,
            username: req.username,
            password: req.password,
            dateOfBirth: req.dateOfBirth,
            internships: req.internships
        };

        // insert the user into the database
        const result = await col.insertOne(user);
        if (result.insertedCount > 0) {
            return { status: "true", message: "User created successfully!" };
        } else {
            return { status: "false", message: "Failed to create user" };
        }
    } catch (err) {
        console.error(err);
        return { status: "false", message: err };
    }
}


module.exports = { get_all_users, check_user, create_user};