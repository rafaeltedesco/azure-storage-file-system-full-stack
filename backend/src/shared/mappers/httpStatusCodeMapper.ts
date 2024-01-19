import {
  ServiceResponseSuccessStatus,
  ServiceResponseErrorStatus,
} from '../enums/serviceResponseEnum';

const httpStatusMapped = {
  [ServiceResponseSuccessStatus.OK]: 200,
  [ServiceResponseSuccessStatus.CREATED]: 201,
  [ServiceResponseErrorStatus.INVALID_DATA]: 400,
};

export const mapHttpStatusCode = (
  status: ServiceResponseSuccessStatus | ServiceResponseErrorStatus,
) => httpStatusMapped[status] ?? 500;
