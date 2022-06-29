// @ts-nocheck
import express from "express";
import http from "http";
import socketio from "socket.io";
import cors from "cors";
import users from "./users";


//const bp = require('body-parser')
const port = process.env.PORT || 8000;
const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);
const clientPositions: { [clientId: string]: { x: number; y: number } } = {};
const clientProfiles: {
	[key: string]: {
		name: string;
		avatar: string;
	};
} = {};

export class Router {
	constructor() {
		httpServer.listen(port, () => {
			console.log("server listening on port", port);
		});
		app.use(cors());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json())
		//app.use(bp.urlencoded({ extended: true }))
		app.use("/users", users);
		io.on("connect", (socket: any) => {

			console.log("connected");
			socket.on("drumbeat", () => {
				socket.broadcast.emit("drumbeat");
			});

			clientProfiles[socket.id] = {
				name: socket.id,
				avatar: "https://ipfs.io/ipfs/QmVAiRHjVLPJYnf7jCpVeqrqRBE7HFN9nm5ZB2QSZ5BY52",
			};

			socket.on("cursor move", (data) => {
				const { x, y } = data;
				clientPositions[socket.id] = { x, y };
				// socket.broadcast.emit(
				socket
					.broadcast.emit(
						"cursor move",
						socket.id,
						[x, y],
						clientProfiles[socket.id]
					);
			});

			socket.on("username", (data) => {
				clientProfiles[socket.id].name = data;
			});

			socket.on("avatar", (data) => {
				clientProfiles[socket.id].avatar = data;
			});

			socket.on("background", (data) => {
				socket
					.broadcast.emit(
						"background",
						data
					);
			});

			socket.on("frame", (data) => {
				socket
					.broadcast.emit(
						"frame",
						data
					);
			});

			socket.on("template", (data) => {
				socket
					.broadcast.emit(
						"template",
						data
					);
			});

			socket.on("whiteboard", (data) => {
				socket
					.broadcast.emit(
						"whiteboard",
						data
					);
			});

			socket.on("exhibit", (data) => {
				socket
					.broadcast.emit(
						"exhibit",
						data
					);
			});

			socket.on("bgColor", (data) => {
				socket
					.broadcast.emit(
						"bgColor",
						data
					);
			});

			socket.on("disconnect", () => {
				// io.emit("roommate disconnect", socket.id);
				socket.broadcast.emit("roommate disconnect", socket.id);
				delete clientProfiles[socket.id];
			});
		});
	}
}
