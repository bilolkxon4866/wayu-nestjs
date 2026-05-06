import {CommandHandler, ICommandHandler} from "@nestjs/cqrs"
import {plainToInstance} from "class-transformer";
import argon2 from "argon2";
import {BadRequestException} from "@nestjs/common";
import {CreateUserCommand} from "./create-user.command";
import {User} from "../../../../user.entity";
import {CreateUserResponse} from "./create-user.response";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    async execute(cmd: CreateUserCommand): Promise<CreateUserResponse> {

        const alreadyExists = await User.findOneBy({userName: cmd.userName})
        if (alreadyExists) {
            throw new BadRequestException('userName alreadyExists')
        }

        const passwordHash = await argon2.hash(cmd.password)

        const user = User.create({
            role: cmd.role,
            userName: cmd.userName,
            fullName: cmd.fullName,
            password: passwordHash,
            birthDate: cmd.birthDate,
            isVerified: cmd.isVerified,
            isActive: cmd.isActive
        })

        await User.save(user)
        return plainToInstance(CreateUserResponse, user, {excludeExtraneousValues: true})
    }
}