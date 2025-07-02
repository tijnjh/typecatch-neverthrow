# typecatch

Simple TypeScript tryCatch util function for both sync and async using neverthrow

## Installation

```sh
npm i typecatch-neverthrow
```

## Usage

```ts
import { tryCatch } from "typecatch";

// function:
const data = tryCatch(() => JSON.parse(/* ... */));

if (!data.isErr()) {
    // do stuff
}


// promise:
const res = await tryCatch(fetch(/* ... */));

if (!res.isErr()) {
    // do stuff
}
```
