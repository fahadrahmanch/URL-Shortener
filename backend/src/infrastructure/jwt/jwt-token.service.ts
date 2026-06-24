import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ITokenService } from "src/domain/entities/token.service.interface";

@Injectable()
export class JwtTokenService implements ITokenService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    generateAccessToken(payload: {
        email: string;
    }): string {
        return this.jwtService.sign(payload);
    }
}