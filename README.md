# tRPC Error Map

Provided the HTTP status code, you will get the corresponding tRPC error code.

## Installation

```bash
npm i trpc-errormap
```

## Usage

```ts
import { trpcErrorMap } from 'trpc-errormap';

throw new TRPCError({
  code: trpcErrorMap(404), // returns "NOT_FOUND"
});
```

Here is the default map object:

```text
400 -> BAD_REQUEST
401 -> UNAUTHORIZED
403 -> FORBIDDEN
404 -> NOT_FOUND
405 -> METHOD_NOT_SUPPORTED
408 -> TIMEOUT
409 -> CONFLICT
412 -> PRECONDITION_FAILED
413 -> PAYLOAD_TOO_LARGE
429 -> TOO_MANY_REQUESTS
499 -> CLIENT_CLOSED_REQUEST
500 -> INTERNAL_SERVER_ERROR
```

**_Note:_** No status code defaults to `PARSE_ERROR`. You can provide a custom status code for it.

**_Note:_** If the status code doesn't match any of the provided codes, it will default to `INTERNAL_SERVER_ERROR`. You can change the default code.

## Customization

You can pass options to `trpcErrorMap` function:

```ts
trpcErrorMap(statusCode, {
  customMap: {
    400: 'PARSE_ERROR', // Override a default code.
    512: 'FORBIDDEN', // Add new codes.
  },

  // Set the default code when there is no match
  defaultError: 'BAD_REQUEST', // default: INTERNAL_SERVER_ERROR
});
```

You can also create a global custom function:

```ts
import { createTrpcErrorMap } from 'trpc-errormap';

const myTrpcErrorMap = createTrpcErrorMap({ customMap: { 512: 'FORBIDDEN' } });

console.log(myTrpcErrorMap(512)); // returns "FORBIDDEN"
console.log(myTrpcErrorMap(512, { customMap: { 512: 'NOT_FOUND' } })); // returns "NOT_FOUND"
```
