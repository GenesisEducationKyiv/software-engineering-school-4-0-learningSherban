import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DotenvConfigService {
    constructor(private configService: ConfigService) {}

    getVariable(key: string): unknown {
        return this.configService.get<string>(`dotenv.${key}`);
    }
}
