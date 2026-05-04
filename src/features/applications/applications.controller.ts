// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     ParseIntPipe,
//     Patch,
//     Post,
//     Query,
//     UploadedFile,
//     UseInterceptors
// } from '@nestjs/common';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateApplicationsRequest } from './commands/create-applications/create-applications.request';
// import { CreateApplicationsResponse } from './commands/create-applications/create-applications.response';
// import { UpdateApplicationsRequest } from './commands/update-applications/update-applications.request';
// import { DeleteApplicationsCommand } from './commands/delete-applications/delete-applications.command';
// import { GetAllApplicationsFilters } from './queries/get-all-applications/get-all-applications.filters';
// import { GetAllApplicationsQuery } from './queries/get-all-applications/get-all-applications.query';
// import { GetAllApplicationsResponse } from './queries/get-all-applications/get-all-applications.response';
// import { GetOneApplicationsQuery } from './queries/get-one-applications/get-one-applications.query';
// import { GetOneApplicationsResponse } from './queries/get-one-applications/get-one-applications.response';
// import {storageOptions} from "../../configs/multer.config";
//
// @ApiTags('Applications')
// @Controller('admin/applications')
// export class ApplicationsController {
//     constructor(
//         private readonly commandBus: CommandBus,
//         private readonly queryBus: QueryBus,
//     ) {}
//
//     @Get()
//     @ApiOkResponse({ type: [GetAllApplicationsResponse] })
//     async getAllApplications(@Query() filters: GetAllApplicationsFilters): Promise<GetAllApplicationsResponse[]> {
//         return this.queryBus.execute(new GetAllApplicationsQuery(filters));
//     }
//
//     @Get(':id')
//     @ApiOkResponse({ type: GetOneApplicationsResponse })
//     async getOneApplications(@Param('id', ParseIntPipe) id: number): Promise<GetOneApplicationsResponse> {
//         return this.queryBus.execute(new GetOneApplicationsQuery(id));
//     }
//
//     @Post()
//     @ApiConsumes('multipart/form-data')
//     @UseInterceptors(FileInterceptor('resume', { storage: storageOptions }))
//     @ApiCreatedResponse({ type: CreateApplicationsResponse })
//     async createApplications(
//         @Body() req: CreateApplicationsRequest,
//         @UploadedFile() file: Express.Multer.File
//     ): Promise<CreateApplicationsResponse> {
//         return this.commandBus.execute(req.toCommand(file.filename));
//     }
//
//     @Patch(':id')
//     @ApiConsumes('multipart/form-data')
//     @UseInterceptors(FileInterceptor('resume', { storage: storageOptions }))
//     async updateApplications(
//         @Param('id', ParseIntPipe) id: number,
//         @Body() req: UpdateApplicationsRequest,
//         @UploadedFile() file?: Express.Multer.File,
//     ): Promise<void> {
//         return this.commandBus.execute(req.toCommand(id, file?.filename));
//     }
//
//     @Delete(':id')
//     async deleteApplications(@Param('id', ParseIntPipe) id: number): Promise<void> {
//         const cmd = new DeleteApplicationsCommand();
//         cmd.id = id;
//         return this.commandBus.execute(cmd);
//     }
// }