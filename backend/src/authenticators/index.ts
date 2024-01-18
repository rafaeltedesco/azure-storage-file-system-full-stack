import { Module } from '@nestjs/common';
import { AzureAuthProvider } from './providers/auth.service';

@Module({
  providers: [AzureAuthProvider],
  exports: [AzureAuthProvider],
})
export class AzureAuthModule {}
