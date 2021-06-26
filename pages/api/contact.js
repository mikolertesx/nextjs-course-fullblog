import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "POST") {
		const { email, name, message } = req.body;
		if (
			!email ||
			!email.includes("@") ||
			!name ||
			name.trim() === "" ||
			!message ||
			message.trim() === ""
		) {
			res.status(422).json({ message: "Invalid input." });
			return;
		}

		// Store it in a database
		const newMessage = {
			email,
			name,
			message,
		};
		let client;

		try {
			client = await MongoClient.connect(
				"mongodb+srv://mikolertesx:guapon@cluster0.uo3pj.mongodb.net/my-site?retryWrites=true&w=majority",
				{ useNewUrlParser: true }
			);
		} catch (error) {
			res.status(500).json({ message: error.message });
			return;
		}

		const db = client.db();
		let result;

		try {
			result = await db.collection("messages").insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (error) {
			client.close();
			return res.status(500).json({ message: "Storing message failed!" });
		}

		client.close();

		return res
			.status(201)
			.json({ message: "Successfully stored message!", message: newMessage });
	}
}

export default handler;
