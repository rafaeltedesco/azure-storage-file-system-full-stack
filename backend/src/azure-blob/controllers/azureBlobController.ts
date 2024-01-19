import { BlobServiceClient } from '@azure/storage-blob';
import { Controller, Get } from '@nestjs/common';

import { AzureAuthProvider } from 'src/authenticators/providers/auth.service';

@Controller('blobs')
export class AzureBlobController {
  private azureClient: BlobServiceClient;

  constructor(private azureAuthProvider: AzureAuthProvider) {
    this.azureClient = this.azureAuthProvider.getClient();
  }

  @Get('list-containers')
  public async listContainers(): Promise<string[]> {
    const containers: Array<string> = [];
    for await (const container of this.azureClient.listContainers()) {
      containers.push(container.name);
    }
    return containers;
  }
}
