import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(ws, request) {
    // whenever someone interact with your ws server, you get ws objext to interact with them.
    // to send them msg event. 
    // ["ws://localhost:3000", "token=123123"]
    const url = request.url;
    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';
    const decoded = jwt.verify(token, JWT_SECRET);

    // @ts-ignore
    if(!decoded || !(decoded as JwtPayload).userId) {
        ws.close();
        return;
    }

    ws.on('message', function message(data) {
        ws.send('pong');
    });
    
})