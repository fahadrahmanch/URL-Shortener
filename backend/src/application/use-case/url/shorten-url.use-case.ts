import { Inject, Injectable } from "@nestjs/common";
import { URL_REPOSITORY } from "../../../domain/tokens";
import type { IUrlRepository } from "../../../domain/interfaces/url.repository.interface";

@Injectable()
export class ShortenUrlUseCase {
    constructor(
        @Inject(URL_REPOSITORY)
        private readonly urlRepository: IUrlRepository,
    ) {}

    async execute(url: string, userEmail?: string) {
        const shortCode = Math.random()
            .toString(36)
            .substring(2, 8);

        await this.urlRepository.create({
            originalUrl: url,
            shortCode,
            userEmail,
        });

        return {
            shortUrl: `http://localhost:3000/${shortCode}`,
        };
    }
}