import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, UseGuards, Req, NotFoundException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BookService } from './book.service';
import { CreatePostArgs } from './dto/create-post.args';
import { authGuard } from 'src/auth/guard';
import { prismaservice } from 'src/prisma/prisma.service';
import { Subjectdto } from './dto/subject-find.dto';
import { query } from 'express';

const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = extname(file.originalname);
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        cb(null, `${name}-${randomName}${extension}`);
    },
});

@Controller('book')
export class BookController {
    constructor(private bookService: BookService, private prisma: prismaservice) { }

    @UseGuards(authGuard)
    @Get("all")
    allBook() {
        return this.bookService.showBooks()
    }

    @Post('post')
    @UseInterceptors(FileInterceptor('pdf', { storage }))
    async postBook(
        @UploadedFile() pdf,
        @Body('Name') Name: string,
        @Body("Catalogue") Catalogue: string
    ): Promise<any> {

        const createPostArgs: CreatePostArgs = {
            Name: Name,
            Catalogue_name: Catalogue
        };

        const savedPdf = await this.bookService.storePdfInDatabase(pdf, createPostArgs);
        return { message: 'PDF uploaded and book posted successfully!', pdf: savedPdf };
    }

    @Get('search')
    async searchBooks(@Query('query') query: string) {
        return this.bookService.searchBooks(query);
    }

    @Get('subject')
    async searchCatalogue(@Query('subject') subject: string) {
        return this.bookService.searchCatalogue(subject);
    }

    @Get('subject/all')
    async searchallcatalogue() {
        return this.bookService.searchallcatalogue();
    }

    @Get('find')
    async searchCatalogueortitle(
        @Query("subject") subject: string,
        @Query("title") title: string
    ) {
        return this.bookService.searchCatalogueortitle(subject, title);
    }

    @Post("Catalogue")
    async postcatalogue(@Body("Catalogue") Catalogue: string) {
        return this.bookService.postcatalogue(Catalogue);
    }
}


