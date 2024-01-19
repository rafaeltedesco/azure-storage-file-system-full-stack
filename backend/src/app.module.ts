import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AzureBlobModule from './azure-blob';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    AzureBlobModule,
  ],
})
export class AppModule {}
