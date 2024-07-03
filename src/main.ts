import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DotenvConfigService } from "./config/dotenv/config.service";
import { HttpExceptionFilter } from "./common/helpers/exceptions/exception-filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dotenvConfig: DotenvConfigService = app.get(DotenvConfigService);
    const port = (dotenvConfig.getVariable("port") as number) || 3100;
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(port);
}
bootstrap();
