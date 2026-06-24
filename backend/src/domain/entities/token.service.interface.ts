export interface ITokenService {
    generateAccessToken(payload: {
        email: string;
    }): string;
}