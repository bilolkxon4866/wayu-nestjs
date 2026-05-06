import {Body, Controller, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus} from "@nestjs/cqrs";
import {CreateLoginAdminCommand} from "./command/create-admin.command";
import {CreateLoginAdminRequest} from "./command/create-admin.request";

@Controller('admin/login')
@ApiTags('Login-Admin')
export class LoginController{
    constructor(private readonly commandBus: CommandBus) {
    }

    @Post()
    async createLogin(@Body()payload: CreateLoginAdminRequest){
        let cmd = new CreateLoginAdminCommand(
            payload.userName,
            payload.password
        )
        return await this.commandBus.execute(cmd)
    }
}