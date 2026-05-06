import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";
import {Request} from "express";
import { RolesKey } from '../decorators/roles.decorator';

@Injectable()
class AuthenticationGuard implements CanActivate{
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let roles = this.reflector.getAllAndOverride(RolesKey, [context.getHandler(), context.getClass()])
        if (!roles) {
            return true
        }

        let request: Request = context.switchToHttp().getRequest()
        if (!request.headers.authorization) {
            throw new UnauthorizedException("Unauthorized")
        }

        let [bearer, token] = request.headers.authorization.split(' ')

        if (bearer.toLocaleLowerCase() !== 'bearer'){
            throw new UnauthorizedException("Unauthorized")
        }

        if(!token){
            throw new UnauthorizedException("Unauthorized")
        }

        try {
            //@ts-ignore
            request.user = this.jwtService.verify(token)
            return true;
        }catch (exc){
            throw new UnauthorizedException("Unauthorized")
        }
    }
}

export default AuthenticationGuard;
