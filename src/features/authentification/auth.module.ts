import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoginController } from "./login/login.controller";
import { CreateLoginAdminHandler } from "./login/command/create-admin.handler";
import { CreateUserHandler } from "./users/users/command/create-user/create-user.handler";
import { UserController } from "./users/user.controller";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [LoginController, UserController],
    providers: [
        CreateLoginAdminHandler,
        CreateUserHandler
    ]
})
export class AuthModule {}