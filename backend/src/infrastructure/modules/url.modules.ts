import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UrlController } from "../../presentation/contollers/url.controller.";
import { RedirectController } from "../../presentation/contollers/redirect.controller";
import { ShortenUrlUseCase } from "../../application/use-case/url/shorten-url.use-case";
import { FindUrlByCodeUseCase } from "../../application/use-case/url/find-url-by-code.use-case";
import { GetAllUrlsUseCase } from "../../application/use-case/url/get-all-urls.use-case";
import { URL_REPOSITORY } from "../../domain/tokens";
import { UrlRepository } from "../repositories/url.repository";
import { Url, UrlSchema } from "../db/models/url.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Url.name,
                schema: UrlSchema,
            },
        ]),
    ],
    controllers: [UrlController, RedirectController],
    providers: [
        ShortenUrlUseCase,
        FindUrlByCodeUseCase,
        GetAllUrlsUseCase,
        {
            provide: URL_REPOSITORY,
            useClass: UrlRepository,
        }
    ]
})
export class UrlModule {}