import { Controller, Get, Redirect, Param } from "@nestjs/common";
import { FindUrlByCodeUseCase } from "src/application/use-case/url/find-url-by-code.use-case";
import { JwtAuthGuard } from "src/infrastructure/jwt/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Controller()
export class RedirectController {
    constructor(
        private readonly findUrlByCodeUseCase: FindUrlByCodeUseCase
    ) { }

    @Get("/:code")
    @Redirect()
    async findByurlCode(@Param("code") code: string) {
        console.log("code",code)
        let originalUrl = await this.findUrlByCodeUseCase.execute(code);
        if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
            originalUrl = 'https://' + originalUrl;
        }
        return { url: originalUrl };
    }
}
