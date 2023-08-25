import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/dist/rpc';

type ErrorMap = Record<number, TRPC_ERROR_CODE_KEY>;

const ERROR_MAP: ErrorMap = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  405: 'METHOD_NOT_SUPPORTED',
  408: 'TIMEOUT',
  409: 'CONFLICT',
  412: 'PRECONDITION_FAILED',
  413: 'PAYLOAD_TOO_LARGE',
  429: 'TOO_MANY_REQUESTS',
  499: 'CLIENT_CLOSED_REQUEST',
  500: 'INTERNAL_SERVER_ERROR',
};

interface ErrorMapOpts {
  customMap?: ErrorMap;
  defaultError?: TRPC_ERROR_CODE_KEY;
}

export function trpcErrorMap(
  statusCode: number,
  options?: ErrorMapOpts
): TRPC_ERROR_CODE_KEY {
  const customMap = options?.customMap;
  const defaultError = options?.defaultError ?? 'INTERNAL_SERVER_ERROR';
  const errorMap = customMap ? { ...ERROR_MAP, ...customMap } : ERROR_MAP;
  const trpcCode = errorMap[statusCode];
  if (!trpcCode) return defaultError;
  return trpcCode;
}

interface CreateErrorMapOpts extends ErrorMapOpts {}

export function createTrpcErrorMap(
  options?: CreateErrorMapOpts
): typeof trpcErrorMap {
  const generalCustomMap = options?.customMap;
  const generalDefaultError = options?.defaultError;

  return (...params: Parameters<typeof trpcErrorMap>) =>
    trpcErrorMap(params[0], {
      customMap: {
        ...ERROR_MAP,
        ...(generalCustomMap ?? {}),
        ...(params[1]?.customMap ?? {}),
      },
      defaultError: generalDefaultError ?? params[1]?.defaultError,
    });
}
