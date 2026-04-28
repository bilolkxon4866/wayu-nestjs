import 'dotenv/config'
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {NestExpressApplication} from "@nestjs/platform-express";
import {configureSwagger} from "./configs/swagger.config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap(){
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    configureSwagger(app)
    app.useGlobalPipes(new ValidationPipe({
        
    }))
    await app.listen(3000, () => console.log("ishga tushdi"))

}

bootstrap()