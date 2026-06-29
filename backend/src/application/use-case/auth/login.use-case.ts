import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import type { IUserRepository } from "../../../domain/interfaces/user.repository.interface";
import { USER_REPOSITORY } from "../../../domain/tokens";
import { HashService } from "../../services/hash.service";
import { TOKEN_SERVICE } from "../../../domain/tokens";
import type { ITokenService } from "../../../domain/entities/token.service.interface";
import { MESSAGES } from "src/domain/constants/messages.constant";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly hashService: HashService,
        @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
    ) {}

    async execute(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
        }

        const isPasswordValid = await this.hashService.comparePassword(password, user.getPassword());
        if (!isPasswordValid) {
            throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
         const accessToken =
            this.tokenService.generateAccessToken({
                email: user.getEmail(),
            });

        return {
            accessToken,
        };
    } 
}
