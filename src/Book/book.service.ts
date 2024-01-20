import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { CreatePostArgs } from './dto/create-post.args';

@Injectable()
export class BookService {
    bookRepository: any;
    constructor(private prisma: prismaservice) { }

    async showBooks() {
        const posts = await this.prisma.post.findMany();
        return posts;
    }

    async storePdfInDatabase(file: any, createPostArgs: CreatePostArgs): Promise<any> {
        const fileName = file.filename;

        const newPost = await this.prisma.post.create({
            data: {
                Name: createPostArgs.Name,
                FileUrl: fileName,
                Catalogue: {
                    connect: {
                        Catalogue: createPostArgs.Catalogue_name,
                    },
                },
            } as any,
        });

        return newPost;
    }

    async searchBooks(query: string): Promise<any> {
        if (!query) {
            throw new NotFoundException('Search query is required.');
        }

        const results = await this.prisma.post.findMany({
            where: {
                Name: {
                    contains: query,
                    mode: 'insensitive',
                }
            }
        });
        if (results.length === 0) {
            throw new NotFoundException(`No books found for the query: ${query}`);
        }

        return results;
    }

    async searchCatalogue(subject: string): Promise<any> {
        if (!subject) {
            throw new NotFoundException('subject is required');
        }

        const FoundCatalogue = await this.prisma.catalogue.findMany({
            where: {
                Catalogue: {
                    contains: subject,
                    mode: "insensitive"
                },
            },
            include: {
                Posts: true
            }
        })

        if (FoundCatalogue.length === 0) {
            throw new NotFoundException(`No Catalogue found for this subject : ${subject}`);
        }

        return FoundCatalogue
    }

    async searchallcatalogue() {
        const Catalogue = await this.prisma.catalogue.findMany();
        return Catalogue;
    }

    async searchCatalogueortitle(subject: string, title: string) {
        const findboth = await this.prisma.post.findMany({
            where: {
                Catalogue_name: {
                    contains: subject,
                    mode: "insensitive"
                },
                Name: {
                    contains: title,
                    mode: "insensitive"
                }
            },
        })

        if (!findboth) {
            throw new HttpException("No Result Found!", HttpStatus.NOT_FOUND);
        }

        return findboth;
    }

    async postcatalogue(Catalogue: string) {
        const postcatalogue = this.prisma.catalogue.create({
            data: {
                Catalogue: Catalogue
            },
        })

        return postcatalogue;
    }
}
