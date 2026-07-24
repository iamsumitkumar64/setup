import { Global, Module } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { UserRepository } from "../repository/user.repository";
import { JwtHelperService } from "../service/jwt.service";

@Global()
@Module({
    providers: [SocketService, JwtHelperService, UserRepository],
    exports: [SocketService],
})
export class SocketModule { }
