
// @ts-nocheck
import express from "express";
import * as admin from "firebase-admin";
import { token_transfer } from './token-transfer'

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

import DiscordJS, { Intents, MessageEmbed, MessageActionRow, MessageButton } from "discord.js"
import dotenv from "dotenv"
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('status').setDescription('Shows drum status'),
	new SlashCommandBuilder().setName('drum').setDescription('Beat the drum'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands("973981884851839026", "965917643322310706"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

dotenv.config()

const client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	]
})
client.login(process.env.TOKEN)

client.on("ready", () => {
	console.log("the bot is ready")
})

function calculateGoal(start, today) {
	console.log("today")
	let goal = start;
	for (let i = 0; i < today; i = i + 7) {
		goal = goal + Math.floor(goal * 0.06);
		console.log("week " + (i / 7) + " : " + goal)
	}
	return goal;
}

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const { commandName } = interaction;

		if (commandName === 'status') {
			const docRef = drumbeat.doc("tracking");
			await docRef.update({ drumbeatCount: admin.firestore.FieldValue.increment(1) });

			const countDoc = await docRef.get();
			let drumCOunt = (countDoc.data()).drumbeatCount;

			const snapshot = await drumstats.get();
			let result = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
			console.log(result)

			const start = 1650574800000; //april 21 
			const dayInterval = 86400000;
			let timestamp = Date.now();

			let dayIndex = (Math.floor((timestamp - start) / dayInterval)).toString();

			let day = 0;
			let week = 0;
			let month = 0;
			let firstWeek = 0;

			result.forEach(element => {
				console.log(element.id)
				console.log(element.data)
				if (dayIndex === element.id) {
					day = element.data.visits
				}
				if (dayIndex - element.id >= 0 && dayIndex - element.id < 7) {
					week += element.data.visits;
				}
				if (dayIndex - element.id >= 0 && dayIndex - element.id < 30) {
					month += element.data.visits;
				}
				if (parseInt(element.id) >= 0 && parseInt(element.id) < 7) {
					firstWeek += element.data.visits;
				}

			});
			let thisWeeksGoal = calculateGoal(firstWeek, dayIndex);
			let blockchainMessage;
			await fetch('https://api.tzstats.com/explorer/contract/KT194J9NAhWX6PbZzfkL7Fp1ZpN5fndXe3et/storage')
				.then(response => response.json())
				.then(data => {
					blockchainMessage = data.value;
				})



			await interaction.reply(
				{
					content:
						`Total drum beat count is  ${drumCOunt} \nToday ${day} visits\nLast 7 days ${week} visits\nLast 30 days ${month} visits\nThis weeks goal ${thisWeeksGoal}\nBlockchain Message: ${blockchainMessage}`,
					ephemeral: false
				}
			);
		}
	} else {
		console.log(interaction);

		try {
			const docRef = drumbeat.doc("tracking");
			await docRef.update({ drumbeatCount: admin.firestore.FieldValue.increment(1) });

			const countDoc = await docRef.get();
			let drumCOunt = (countDoc.data()).drumbeatCount;
			await interaction.reply({ content: `<@${interaction.user.id}> drumming ! \ drum count ${drumCOunt}`, ephemeral: false });
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true });
		}
	}
});


admin.initializeApp({
	credential: admin.credential.cert(
		JSON.parse(
			//@ts-ignore
			Buffer.from(process.env.FIREBASE_CONFIG_BASE64, "base64").toString(
				"ascii"
			)
		)
	),
	databaseURL: "https://adventure-ea7cd.firebaseio.com",
});
const db = admin.firestore();
const users = express.Router();

const drumbeat = db.collection("drumbeat");
const drumstats = db.collection("drumStats");

users.post("/profile/:address", async (req, res) => {
	const { address } = req.params as { address: string };
	const { username } = req.body as { username: string };
	const { avatar } = req.body as { avatar: string };
	db.collection("users")
		.doc(address)
		.set({ address: address, username: username, avatar: avatar })
		.then(() => res.sendStatus(200));
});

users.get("/profile/:address", async (req, res) => {
	const { address } = req.params as { address: string };
	const result = await (
		await db.collection("users").doc(address).get()
	).data();

	res.status(200).send(result);
});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.get("/background", async (req, res) => {
	const result = await (
		await db.collection("background").doc("background").get()
	).data();

	res.status(200).send(result);
});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.post("/background", async (req, res) => {
	const { background } = req.body as { background: string };

	db.collection("background")
		.doc("background")
		.set({ background: background })
		.then(() => res.sendStatus(200));
});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.get("/frame", async (req, res) => {
	const frames = await db.collection('frames')
	frames.get().then((querySnapshot) => {
		const tempDoc = querySnapshot.docs.map((doc) => {
			return { id: doc.id, ...doc.data() }
		})
		res.status(200).send(tempDoc);
	})


});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.post("/frame", async (req, res) => {
	const { image } = req.body as { image: string };
	const { title } = req.body as { title: string };
	const { id } = req.body as { id: number };

	db.collection("frames")
		.doc(id.toString())
		.set({ image: image, title: title })
		.then(() => res.sendStatus(200));
});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.get("/template", async (req, res) => {
	const result = await (
		await db.collection("template").doc("template").get()
	).data();

	res.status(200).send(result);
});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.post("/template", async (req, res) => {
	const { template } = req.body as { template: string };

	db.collection("template")
		.doc("template")
		.set({ template: template })
		.then(() => res.sendStatus(200));
});

//drum



users.post("/drum/:address", async (req, res) => {
	var host = req.get("referer");
	if ("https://trydrum.net/" === host || "http://localhost:3000/" === host) {
		const { address } = req.params as { address: string };
		const { amt } = req.body as { amt: string };
		const docRef = drumbeat.doc("tracking");
		const limitedAmt = amt > 100 ? 100 : amt;
		await docRef.update({ drumbeatCount: admin.firestore.FieldValue.increment(limitedAmt) });
		const userDoc = await drumbeat.doc("unclaimed").collection("users").doc(address).get()


		console.log(req.get("Authorization"));


		if (!userDoc.exists) {
			drumbeat.doc("unclaimed").collection("users").doc(address).set({ amount: 1 });
		}
		else {
			drumbeat.doc("unclaimed").collection("users").doc(address).update({ amount: admin.firestore.FieldValue.increment(limitedAmt) });
		}
		console.log("drum ! by # " + limitedAmt + " , " + address);
		res.sendStatus(200);


		const countDoc = await docRef.get();

		const channel = client.channels.cache.find(channel => channel.name == "drum")

		const exampleEmbed = new MessageEmbed()
			.setTitle("Drum count: " + (countDoc.data()).drumbeatCount)
			.setURL('https://trydrum.net/')
			.setAuthor({ name: `${address} drumming !` })
			.setDescription(`${address} hit the drum ${limitedAmt} times`)
			.setTimestamp()

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('beat-drum')
					.setLabel('DRUM')
					.setStyle('SECONDARY')
					.setEmoji('🥁'),
			);

		channel.send({
			embeds: [exampleEmbed],
			components: [row],
		});



	}
});

users.post("/drum/claim/:address", async (req, res) => {
	var host = req.get("referer");
	if ("https://trydrum.net/" === host || "https://peopleparty.xyz/" || "http://localhost:3000/" === host) {
		const { address } = req.params as { address: string };

		const doc = await drumbeat.doc("unclaimed").collection("users").doc(address).get()

		if (doc.exists) {
			let amount = 0;
			if (doc.data()) {
				amount = doc.data()!.amount;
			}
			//update in firebase
			await drumbeat.doc("unclaimed").collection("users").doc(address).set({ amount: 0 });

			//send in blockchain
			//const RPC_URL = 'https://rpc.hangzhounet.teztnets.xyz';
			const RPC_URL = 'https://mainnet-node.madfish.solutions';
			const CONTRACT = 'KT1DX7UdxtzW7bEBihW31kV8Ge4MojAgrLNW' //address of the published contract
			const SENDER = 'tz1VZmjJL3AmPftJSBJPKPiWkEiU4Eiiv193' //public address of the sender (find it in acc.json)
			const RECEIVER = address; // recipient's public address 
			const tokenTransfer = new token_transfer(RPC_URL);
			const result = await tokenTransfer.transfer(CONTRACT, SENDER, RECEIVER, amount);

			res.status(200).send(result);
			//res.status(200).send({"message": data.drumbeatCount, "claim": 0});
		}
		else {
			res.sendStatus(500);
		}
	}
});

users.get("/drum/:address", async (req, res) => {
	var host = req.get("referer");
	if ("https://trydrum.net/" === host || "https://peopleparty.xyz/" || "http://localhost:3000/" === host) {
		const { address } = req.params as { address: string };

		const docRef = drumbeat.doc("tracking");
		const countDoc = await docRef.get();

		const claimDoc = await drumbeat.doc("unclaimed").collection("users").doc(address).get()
		if (!countDoc.exists || !claimDoc.exists) {
			if (countDoc.exists) {
				const data = countDoc.data() as { drumbeatCount: number };
				console.log("still " + address);
				res.status(200).send({ "count": data.drumbeatCount, "claim": 0 });
			}
			else {
				console.log("there is no count doc ! prob firebase down " + address);
				res.sendStatus(500);
			}
		} else {
			const data = countDoc.data() as { drumbeatCount: number };
			const data2 = claimDoc.data() as { amount: number };

			res.status(200).send({ "count": data.drumbeatCount, "claim": data2.amount });
		}
	}
});

users.post("/drum/sync/:address", async (req, res) => {
	var host = req.get("referer");
	if ("https://trydrum.net/" === host || "https://peopleparty.xyz/" || "http://localhost:3000/" === host) {

		const { address } = req.params as { address: string };
		const { tempAddress } = req.body as { tempAddress: string };
		console.log(tempAddress + " -> sending funds -> " + address);

		// get temp address amount
		// add to new address amount
		// delete the old amount
		// return updated balance
		const tempAddressDoc = await drumbeat.doc("unclaimed").collection("users").doc(tempAddress).get()

		if (tempAddressDoc.exists) {
			const tempAddressRes = tempAddressDoc.data() as { amount: number };

			const addressDoc = await drumbeat.doc("unclaimed").collection("users").doc(address).get();

			let updatedBalance = tempAddressRes.amount;

			if (addressDoc.exists) {
				const addressRes = addressDoc.data() as { amount: number };
				updatedBalance = addressRes.amount + tempAddressRes.amount;
			}

			await drumbeat.doc("unclaimed").collection("users").doc(address).set({ amount: updatedBalance });
			await drumbeat.doc("unclaimed").collection("users").doc(tempAddress).set({ amount: 0 });
			res.status(200).send({ "updatedBalance": updatedBalance });
		}
		else {
			res.sendStatus(500);
		}
	}
});

users.get("/drum/getBalance/:address", async (req, res) => {
	var host = req.get("referer");
	if ("https://trydrum.net/" === host || "https://peopleparty.xyz/" || "http://localhost:3000/" === host) {
		const { address } = req.params as { address: string };
		let result = 0;
		fetch('https://api.tzstats.com/explorer/bigmap/52426/values')
			.then(response => response.json())
			.then(data => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].key[0] === address) {
						result = data[i].value;
						res.status(200).send({ "balance": result });
					}
				}
			})
	}
});

users.get("/getBlockchainMessage", async (req, res) => {

	fetch('https://api.tzstats.com/explorer/contract/KT194J9NAhWX6PbZzfkL7Fp1ZpN5fndXe3et/storage')
		.then(response => response.json())
		.then(data => {
			res.status(200).send(data);
		})
});


//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.get("/exhibit", async (req, res) => {
	const result = await (
		await db.collection("exhibit").doc("exhibit").get()
	).data();

	res.status(200).send(result);
});

//its temporary in the users.ts file will be moved to better place like rooms.ts depending on next features
users.post("/exhibit", async (req, res) => {
	const { address } = req.body as { address: string };

	db.collection("exhibit")
		.doc("exhibit")
		.set({ address: address })
		.then(() => res.sendStatus(200));
});

users.post("/bgColor", async (req, res) => {
	const { colorIndex } = req.body as { colorIndex: number };
	console.log("wololor" + colorIndex)
	db.collection("backgroundColor")
		.doc("backgroundColor")
		.set({ colorIndex: colorIndex })
		.then(() => res.sendStatus(200));
});

users.get("/bgColor", async (req, res) => {
	const result = await (
		await db.collection("backgroundColor").doc("backgroundColor").get()
	).data();
	console.log(result)
	res.status(200).send(result);
});

users.post("/visit", async (req, res) => {
	const { dayIndex } = req.body as { dayIndex: string };
	const dayDoc = await drumstats.doc(dayIndex).get()

	if (!dayDoc.exists) {
		drumstats.doc(dayIndex).set({ visits: 1 });
	}
	else {
		drumstats.doc(dayIndex).update({ visits: admin.firestore.FieldValue.increment(1) });
	}
	res.sendStatus(200);
});

users.get("/visit", async (req, res) => {
	const snapshot = await drumstats.get();
	let result = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
	console.log(result)
	res.status(200).send(result);
});

export default users;
