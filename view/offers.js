//connect to mongodb
const { MongoClient } = require("mongodb");
const db = "mongodb://vibecards:4rFvbgt256yhn@localhost:27017/admin";
const client = new MongoClient(db);
const database_env = "internlink";
const col_env = "offers";

async function get_all_offers(req) {
    try {
        const db = client.db(database_env)
        const col = db.collection(col_env)
        const result = await col.find().toArray()
        return { status: "true", message: "success", result: result }
    } catch { err } {
        return { status: "false", message: err }
    }
}

async function check_offers(req) {
    try {
        const db = client.db(database_env)
        const col = db.collection(col_env)
        const result = await col.findOne({ title: req.title, company: req.company })
        console.log(result)
        return { status: "true", message: "success", result: result }
    } catch { err } {
        return { status: "false", message: err }
    }
}

async function add_offer(req){
    try {
        // connect to the database
        const db = client.db(database_env)
        const col = db.collection(col_env)

        const offer = {
            title: req.title,
            company: req.company,
            duration: req.duration,
            image: req.image,
            id: req.id
        };

        // insert the user into the database
        const result = await col.insertOne(offer);
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

module.exports = { get_all_offers, check_offers, add_offer };