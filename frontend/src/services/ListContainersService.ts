import axios, { AxiosInstance } from 'axios';

export type ListContainerSVCResponse = Array<{containerName: string}>

export class ListContainersService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: 'http://localhost:7071' })
  }
  async listContainers() {
    const { data } = await this.api.get('http://localhost:7071/blobs/list-containers');
    return data.containers as ListContainerSVCResponse;
  }
}
