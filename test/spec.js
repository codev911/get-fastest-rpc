const { testAllRpc, testRpc, getBestRpc, testAllRpcByChainId, getBestRpcByChainId } = require('get-fastest-rpc');

const rpc = [
    "https://polygon-testnet.public.blastapi.io",
    "https://matic-testnet-archive-rpc.bwarelabs.com",
    "https://matic-mumbai.chainstacklabs.com",
    "https://polygontestapi.terminet.io/rpc",
    "https://rpc.ankr.com/polygon_mumbai",
    "https://rpc-mumbai.maticvigil.com",
];

async function test(){
    console.log("example rpcs : ", rpc)
    console.log("test all rpcs : ", await testAllRpc(rpc))
    console.log("test rpcs index 0 : ", await testRpc(rpc[0]))
    console.log("test rpcs index 0 and update timeout to 500ms : ", await testRpc(rpc[0], 500))
    console.log("best from all rpcs : ", await getBestRpc(rpc))
    console.log("test all rpcs by chain id 1 (ethereum) : ", await testAllRpcByChainId(1))
    console.log("best from all rpcs by chain id 1 (ethereum)  : ", await getBestRpcByChainId(1))
}

test()