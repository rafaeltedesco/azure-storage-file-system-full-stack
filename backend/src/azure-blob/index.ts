import { Module } from '@nestjs/common';
import { AzureBlobController } from './controllers/azureBlobController';
import { AzureAuthModule } from 'src/authenticators';

@Module({
  imports: [AzureAuthModule],
  controllers: [AzureBlobController],
})
export default class AzureBlobModule {}
