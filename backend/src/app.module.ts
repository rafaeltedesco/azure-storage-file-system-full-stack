import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AzureBlobModule from './azure-blob';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AzureBlobModule,
  ],
})
export class AppModule {}
