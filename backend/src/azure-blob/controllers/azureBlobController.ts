import { Controller, Get, Param } from '@nestjs/common';
import { AzureAuthProvider } from 'src/authenticators/providers/auth.service';

@Controller('blobs')
export class AzureBlobController {
  constructor(private azureAuthProvider: AzureAuthProvider) {}

  @Get('files/:containerName')
  public async listFilesFromContainer(
    @Param('containerName')
    containerName: string,
  ): Promise<string[]> {
    const azureClient = this.azureAuthProvider.getClient();
    const containerClient = azureClient.getContainerClient(containerName);
    const blobs = [];
    for await (const blob of containerClient.listBlobsByHierarchy('/')) {
      blobs.push({ name: blob.name });
    }
    return blobs;
  }

  @Get('list-containers')
  public async listContainers(): Promise<string[]> {
    const azureClient = this.azureAuthProvider.getClient();
    const containers: Array<string> = [];
    for await (const container of azureClient.listContainers()) {
      containers.push(container.name);
    }
    return containers;
  }
}
