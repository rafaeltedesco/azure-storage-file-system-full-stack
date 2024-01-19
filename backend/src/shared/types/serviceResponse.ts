import { ContainerClient } from '@azure/storage-blob';
import {
  ServiceResponseErrorStatus,
  ServiceResponseSuccessStatus,
} from '../enums/serviceResponseEnum';

type ServiceResponse<T> = {
  status: ServiceResponseSuccessStatus;
  data: T;
};

export type FileCreated = {
  requestId: string;
  filename: string;
};

export type ContainerClientDTO = {
  containerClient: ContainerClient;
};

export type BlobDTO = {
  name: string;
};

type ResponseError = {
  status: ServiceResponseErrorStatus;
  data: {
    error: string;
  };
};

export type ServiceResponseOrError<T> = ServiceResponse<T> | ResponseError;
