# get-fastest-rpc
This is RPC tester and get best RPC for ETH or Fork. All chain RPC got from [Chainlist.org](https://chainlist.org/).

## Install
1. Via NPM : `npm i get-fastest-rpc`
2. Via Yarn : `yarn add get-fastest-rpc`

## Import
1. CJS : `const { testAllRpc, testRpc, getBestRpc, testAllRpcByChainId, getBestRpcByChainId } = require('get-fastest-rpc')`
2. ESM : `import { testAllRpc, testRpc, getBestRpc, testAllRpcByChainId, getBestRpcByChainId } from 'get-fastest-rpc'`

## Usage by Chain ID
### A. testAllRpcByChainId
```JavaScript
    import { testAllRpcByChainId } from 'get-fastest-rpc';
    // if use commonjs use this :
    // const { testAllRpcByChainId } = require('get-fastest-rpc');

    // example chainId
    const chainId = 80001;

    // example function for test
    async test(){
        console.log(await testAllRpcByChainId(chainId));
    }
    test();

    // result will be like
    // [
    //     { rpc: 'https://polygon-testnet.public.blastapi.io', ms: 230 },
    //     { rpc: 'https://matic-testnet-archive-rpc.bwarelabs.com', ms: 272 },
    //     { rpc: 'https://matic-mumbai.chainstacklabs.com', ms: 588 },
    //     { rpc: 'https://polygontestapi.terminet.io/rpc', ms: 138 },
    //     { rpc: 'https://rpc.ankr.com/polygon_mumbai', ms: 490 },
    //     { rpc: 'https://rpc-mumbai.maticvigil.com', ms: 647 }
    // ]
```
Default timeout is 3000ms, you can update timeout by calling function like this `testAllRpcByChainId(chainId, 5000)`.

### B. getBestRpcByChainId
```JavaScript
    import { getBestRpcByChainId } from 'get-fastest-rpc';
    // if use commonjs use this :
    // const { getBestRpcByChainId } = require('get-fastest-rpc');

    // example chainId
    const chainId = 80001;

    // example function for test
    async test(){
        console.log(await getBestRpcByChainId(chainId));
    }
    test();

    // result will be like
    // https://polygon-testnet.public.blastapi.io
```
Default timeout is 3000ms, you can update timeout by calling function like this `getBestRpcByChainId(chainId, 5000)`.

## Usage for Custom RPC
### A. testRpc
```JavaScript
    import { testRpc } from 'get-fastest-rpc';
    // if use commonjs use this :
    // const { testRpc } = require('get-fastest-rpc');

    // example rpc
    const rpc = "https://rpc-mumbai.maticvigil.com";

    // example function for test
    async test(){
        console.log(await testRpc(rpc));
    }
    test();

    // result will be like
    // { rpc: 'https://rpc-mumbai.maticvigil.com', ms: 234 }
```
Default timeout is 3000ms, you can update timeout by calling function like this `testRpc(rpc, 5000)`.

### B. testAllRpc
```JavaScript
    import { testAllRpc } from 'get-fastest-rpc';
    // if use commonjs use this :
    // const { testAllRpc } = require('get-fastest-rpc');

    // example rpcs
    const rpc = [
        "https://polygon-testnet.public.blastapi.io",
        "https://matic-testnet-archive-rpc.bwarelabs.com",
        "https://matic-mumbai.chainstacklabs.com",
        "https://polygontestapi.terminet.io/rpc",
        "https://rpc.ankr.com/polygon_mumbai",
        "https://rpc-mumbai.maticvigil.com",
    ];

    // example function for test
    async test(){
        console.log(await testAllRpc(rpc));
    }
    test();

    // result will be like
    // [
    //     { rpc: 'https://polygon-testnet.public.blastapi.io', ms: 230 },
    //     { rpc: 'https://matic-testnet-archive-rpc.bwarelabs.com', ms: 272 },
    //     { rpc: 'https://matic-mumbai.chainstacklabs.com', ms: 588 },
    //     { rpc: 'https://polygontestapi.terminet.io/rpc', ms: 138 },
    //     { rpc: 'https://rpc.ankr.com/polygon_mumbai', ms: 490 },
    //     { rpc: 'https://rpc-mumbai.maticvigil.com', ms: 647 }
    // ]
```
Default timeout is 3000ms, you can update timeout by calling function like this `testAllRpc(rpc, 5000)`.

### C. getBestRpc
```JavaScript
    import { getBestRpc } from 'get-fastest-rpc';
    // if use commonjs use this :
    // const { getBestRpc } = require('get-fastest-rpc');

    // example rpcs
    const rpc = [
        "https://polygon-testnet.public.blastapi.io",
        "https://matic-testnet-archive-rpc.bwarelabs.com",
        "https://matic-mumbai.chainstacklabs.com",
        "https://polygontestapi.terminet.io/rpc",
        "https://rpc.ankr.com/polygon_mumbai",
        "https://rpc-mumbai.maticvigil.com",
    ];

    // example function for test
    async test(){
        console.log(await getBestRpc(rpc));
    }
    test();

    // result will be like
    // https://polygon-testnet.public.blastapi.io
```
Default timeout is 3000ms, you can update timeout by calling function like this `getBestRpc(rpc, 5000)`.