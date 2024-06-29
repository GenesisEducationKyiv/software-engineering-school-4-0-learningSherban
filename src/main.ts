import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DotenvConfigService } from "./config/dotenv/config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dotenvConfig: DotenvConfigService = app.get(DotenvConfigService);
    const port = (dotenvConfig.getVariable("port") as number) || 3100;
    await app.listen(port);
}
bootstrap();
