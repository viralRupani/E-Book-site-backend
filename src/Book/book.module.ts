import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { prismaservice } from "src/prisma/prisma.service";
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
    imports: [NestjsFormDataModule],
    controllers: [BookController],
    providers: [BookService, prismaservice]
})

export class bookmodule { }