import {Command} from "@nestjs/cqrs";
import {CreateLoginAdminResponse} from "./create-admin.response";

export class CreateLoginAdminCommand extends Command<CreateLoginAdminResponse>{
    constructor(
        public userName: string,
        public password: string
    ) {
        super();
    }
}