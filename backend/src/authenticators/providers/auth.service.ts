// import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureAuthProvider {
  static client: BlobServiceClient;
  constructor(private configService: ConfigService) {}

  public getClient(): BlobServiceClient {
    if (!AzureAuthProvider.client) {
      AzureAuthProvider.client = BlobServiceClient.fromConnectionString(
        this.configService.get('AZURE_STORAGE_CONN_STRING'),
      );
    }
    return AzureAuthProvider.client;
  }
}
