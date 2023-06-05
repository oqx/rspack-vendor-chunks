# Rspack Vendor Chunks Issue

The described usage in the rspack docs does not align with the current config implementation:
https://www.rspack.dev/config/optimization-split-chunks.html#splitchunksname

Providing a `Function` as a value to `splitChunks.name` or `splitChunks.cacheGroups.{cacheGroup}.name` throws the following error:

```sh
Error: Failed to convert JavaScript value `function name(..) ` into rust type `String`
    at Compiler._Compiler_instance_get (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/@rspack+core@0.2.0_webpack-dev-server@4.13.1_webpack@5.76.0/node_modules/@rspack/core/src/compiler.ts:280:4)
    at __classPrivateFieldGet (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/@rspack+core@0.2.0_webpack-dev-server@4.13.1_webpack@5.76.0/node_modules/@rspack/core/dist/compiler.js:34:48)
    at Compiler.build (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/@rspack+core@0.2.0_webpack-dev-server@4.13.1_webpack@5.76.0/node_modules/@rspack/core/src/compiler.ts:815:24)
    at /Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/@rspack+core@0.2.0_webpack-dev-server@4.13.1_webpack@5.76.0/node_modules/@rspack/core/src/compiler.ts:784:11
    at Hook.eval [as callAsync] (eval at create (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/Hook.js:18:14)
    at /Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/@rspack+core@0.2.0_webpack-dev-server@4.13.1_webpack@5.76.0/node_modules/@rspack/core/src/compiler.ts:779:20
    at Hook.eval [as callAsync] (eval at create (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)
    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/tapable@2.2.1/node_modules/tapable/lib/Hook.js:18:14)
    at doRun (/Users/jaykariesch/projects/rspack/react/node_modules/.pnpm/@rspack+core@0.2.0_webpack-dev-server@4.13.1_webpack@5.76.0/node_modules/@rspack/core/src/compiler.ts:775:25) {
  code: 'StringExpected'
}
```

The `name` property types also do not have a function as part of the union.

## Commands

### Build
Build using a function on the `name` property of `splitChunks`.
```sh
pnpm build
```

Build using a function on the `name` property of `cacheGroups`.
```sh
pnpm build:vendor
```