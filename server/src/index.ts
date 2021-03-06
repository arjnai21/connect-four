import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
// SocketIO Server
import Http from 'http';
import {Server as SocketIOServer} from 'socket.io';
import ProtocolManager from "./io/ProtocolManager";
import configureListeners from "./io/configureListeners";

// Express Server
const port = Number(process.env.PORT || 3001);
// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });

const http = Http.createServer(app);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const ioServer = new SocketIOServer(http);
const manager = new ProtocolManager();

configureListeners(ioServer, manager);

ioServer.listen(http, { cors: { origin: 'https://go.ionita.dev' } })

http.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});