# get-fastest-rpc
This is RPC tester and get best RPC for ETH or Fork. All chain RPC got from [Chainlist.org](https://chainlist.org/).

## Install
1. Via NPM : `npm i get-fastest-rpc`
2. Via Yarn : `yarn add get-fastest-rpc`

## Import
1. CJS : `const { testAllRpc, testRpc, getBestRpc, testAllRpcByChainId, getBestRpcByChainId } = require('get-fastest-rpc')`
2. ESM : `import { testAllRpc, testRpc, getBestRpc, testAllRpcByChainId, getBestRpcByChainId } from 'get-fastest-rpc'`

## Usage
### A. testRpc
```
    import { testRpc } from 'get-fastest-rpc';
    // if use commonjs use this :
    // const { testRpc } = require('get-fastest-rpc');

    // example rpc
    const rpc = "https://rpc-mumbai.maticvigil.com";

    // example function for test
    async test(){
        console.log(await testRpc(rpc));
    }

    // result will be like
    // { rpc: 'https://rpc-mumbai.maticvigil.com', ms: 234 }
```