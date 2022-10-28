const { testAllRpc } = require('get-fastest-rpc');

// const rpc = [
//     "https://data-seed-prebsc-1-s1.binance.org:8545/",
//     "https://data-seed-prebsc-2-s1.binance.org:8545/",
//     "https://data-seed-prebsc-1-s2.binance.org:8545/",
//     "https://data-seed-prebsc-2-s2.binance.org:8545/",
//     "https://data-seed-prebsc-1-s3.binance.org:8545/",
//     "https://data-seed-prebsc-2-s3.binance.org:8545/"
// ];

const rpc = [
    "https://polygon-testnet.public.blastapi.io",
    "https://matic-testnet-archive-rpc.bwarelabs.com",
    "https://matic-mumbai.chainstacklabs.com",
    "https://polygontestapi.terminet.io/rpc",
    "https://rpc.ankr.com/polygon_mumbai",
    "https://rpc-mumbai.maticvigil.com",
];

async function test(){
    console.log(await testAllRpc(rpc))
}

test()