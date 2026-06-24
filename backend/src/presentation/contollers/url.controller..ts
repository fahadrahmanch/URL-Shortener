import { Controller, Post, Body, Req, UseGuards, Get } from "@nestjs/common";
import { ShortenUrlUseCase } from "src/application/use-case/url/shorten-url.use-case";
import { GetAllUrlsUseCase } from "src/application/use-case/url/get-all-urls.use-case";
import { JwtAuthGuard } from "src/infrastructure/jwt/jwt-auth.guard";

@Controller("user")
export class UrlController {
    constructor(
        private readonly shortenUrlUseCase: ShortenUrlUseCase,
        private readonly getAllUrlsUseCase: GetAllUrlsUseCase
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("/shorten")
    async shorten(@Body() data: { url: string }, @Req() req: any) {
        const userEmail = req.user?.email;
        const result = await this.shortenUrlUseCase.execute(data.url, userEmail)
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get("/urls")
    async getAllUrls(@Req() req: any) {
        const userEmail = req.user?.email;
        return this.getAllUrlsUseCase.execute(userEmail);
    }
}