import { Module } from '@nestjs/common';
import { WebSocketServce } from './websocket.server';

@Module({
    imports: [],
    providers: [WebSocketServce],
    exports: [WebSocketServce]
})
export class WebsocketModule { }
