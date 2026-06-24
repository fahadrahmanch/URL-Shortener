export interface IUrlRepository {
    create(data: { originalUrl: string; shortCode: string; userEmail?: string }): Promise<void>;
    findByCode(code: string): Promise<{ originalUrl: string } | null>;
    findByUserEmail(email: string): Promise<any[]>;
}
