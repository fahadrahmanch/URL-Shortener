import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { URL_REPOSITORY } from "../../../domain/tokens";
import type { IUrlRepository } from "../../../domain/interfaces/url.repository.interface";

@Injectable()
export class FindUrlByCodeUseCase {
    constructor(
        @Inject(URL_REPOSITORY)
        private readonly urlRepository: IUrlRepository,
    ) {}

    async execute(code: string) {
        console.log(code);
        const urlDoc = await this.urlRepository.findByCode(code);
        if (!urlDoc) {
            throw new NotFoundException("URL not found");
        }
        return urlDoc.originalUrl;
    }
}
