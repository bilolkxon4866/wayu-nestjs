import {Command} from "@nestjs/cqrs";
import {Role} from "../../../../../../core/enum/enum";
import {CreateUserResponse} from "./create-user.response";

export class CreateUserCommand extends Command<CreateUserResponse>{
    constructor(
        public role: Role,
        public userName: string,
        public fullName: string,
        public password: string,
        public birthDate: string,
        public isVerified: boolean,
        public isActive: boolean,
    ) {
        super();
    }
}