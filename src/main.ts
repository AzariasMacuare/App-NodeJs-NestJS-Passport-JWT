import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  
  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('UsersTasks')
    .setDescription('App of Tasks where users can login and use an CRUD from tasks')
    .setVersion('1.0.0')
    .addTag('api')
    .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('api/swagger', app, document, {
      explorer: true,
      swaggerOptions: {
        filter: true,
        showRequestDuration: true
      }
    })

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
