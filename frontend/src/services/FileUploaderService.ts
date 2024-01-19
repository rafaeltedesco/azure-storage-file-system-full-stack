import axios, { AxiosError, AxiosInstance } from 'axios';
import { SendImageProps } from '../types/Services'

export class FileUploaderService {
  private api: AxiosInstance;
  private containerCreationAttempted = false;

  constructor() {
    this.api = axios.create({ baseURL: 'http://localhost:7071' })
  }
  async createContainer(containerName: string) {
    await this.api.post('http://localhost:7071/blobs/create-container', {
      containerName,
    })
  }

  async sendImages({ formData, containerName } : SendImageProps)  {
    try {
      await this.api.post(
        `/blobs/upload/${containerName}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        console.log('images sent');
      } catch (err) {
        if ((err as AxiosError).code === 'ERR_BAD_REQUEST') {
          if (!this.containerCreationAttempted) {
            this.containerCreationAttempted = true;
            this.createContainer(containerName);
            console.log('container created... trying to send images again')
            this.sendImages({ formData, containerName })
            this.containerCreationAttempted = false;
          } else {
            console.error('Erro ao criar container');
            throw err;
          }
        }
      }
    }
}
