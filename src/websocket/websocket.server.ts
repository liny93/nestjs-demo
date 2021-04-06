import { Logger } from "@nestjs/common";
import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import * as WebSocket from 'ws'


@WebSocketGateway(+process.env.WEBSOCKET_SERVER_PORT)
export class WebSocketServce {

    @WebSocketServer()
    private server: WebSocket.Server;

    private logger: Logger = new Logger(WebSocketServce.name)

    constructor(
    ) {
        this.logger.log('webscoket server init')
    }

    // 处理ws client连接
    public handleConnection(@ConnectedSocket() client: WebSocket, data: any) {
        this.logger.log(`websocket client connect`)
    }

    // 清理已断开的连接
    public handleDisconnect(@ConnectedSocket() client: WebSocket) {
        this.logger.log(`client disconnect`)
    }

    // 客户端有任务关闭事件
    @SubscribeMessage('TASK_CLOSE')
    onTaskClose(client: WebSocket, data: string) {
        this.logger.log(`get close event`)
    }

    // 客户端有任务关闭事件
    @SubscribeMessage('HEART')
    onHeart(client: WebSocket, data: string) {
        this.logger.log(`get heart event`)
    }
}   