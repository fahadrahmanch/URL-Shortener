import { Inject, Injectable } from "@nestjs/common";
import { URL_REPOSITORY } from "../../../domain/tokens";
import type { IUrlRepository } from "../../../domain/interfaces/url.repository.interface";

@Injectable()
export class GetAllUrlsUseCase {
    constructor(
        @Inject(URL_REPOSITORY)
        private readonly urlRepository: IUrlRepository,
    ) {}

    async execute(userEmail: string) {
        const urls = await this.urlRepository.findByUserEmail(userEmail);
        return urls.map(url => ({
            id: url._id.toString(),
            originalUrl: url.originalUrl,
            shortUrl: `http://localhost:3000/${url.shortCode}`,
            createdAt: new Date(url.createdAt).toLocaleDateString()
        }));
    }
}
