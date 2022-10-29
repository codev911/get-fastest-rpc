const axios = require('axios');
const chainRpcs = require('../chainRpcs').default;

export const getBestRpcByChainId = async (chainId, rto) => {
    const alive = [];
    const listrpc = chainRpcs[chainId]?.rpcs;
    let timeout = 3000;

    if(chainId === undefined){
        throw "Please fill chain id";
    }

    if(rto !== undefined){
        timeout = rto;
    }

    if(listrpc.length === 0){
        throw "unsupported chain id, please use `getBestRpc`";
    }

    const getAlive = await testAllRpc(listrpc, timeout);
    getAlive.forEach(result => {
        if(result?.ms !== "timeout"){
            alive.push(result);
        }
    });

    if(alive.length === 0){
        throw "All rpc timeout, please check your internet connection or check your rpc url.";
    }else{
        const newAlive = sortByKey(alive, 'ms');
        return newAlive[0].rpc;
    }
}

export const testAllRpcByChainId = async (chainId, rto) => {
    const run = [];
    const listrpc = chainRpcs[chainId]?.rpcs;
    let timeout = 3000;

    if(chainId === undefined){
        throw "Please fill chain id";
    }

    if(rto !== undefined){
        timeout = rto;
    }

    if(listrpc.length === 0){
        throw "unsupported chain id, please use `getBestRpc`";
    }

    listrpc.forEach(rpc => {
        run.push(testRpc(rpc, timeout));
    });

    const value = await Promise.all(run);
    return value;
}

export const getBestRpc = async (listrpc, rto) => {
    const alive = [];
    let timeout = 3000;

    if(rto !== undefined){
        timeout = rto;
    }

    const getAlive = await testAllRpc(listrpc, timeout);
    getAlive.forEach(result => {
        if(result?.ms !== "timeout"){
            alive.push(result);
        }
    });

    if(alive.length === 0){
        throw "All rpc timeout, please check your internet connection or check your rpc url.";
    }else{
        const newAlive = sortByKey(alive, 'ms');
        return newAlive[0].rpc;
    }
}

export const testAllRpc = async (listrpc, rto) => {
    const run = [];
    let timeout = 3000;

    if(rto !== undefined){
        timeout = rto;
    }

    listrpc.forEach(rpc => {
        run.push(testRpc(rpc, timeout));
    });

    const value = await Promise.all(run);
    return value;
}

export const testRpc = async (rpc, rto) => {
    let timeout = 3000;

    if(rto !== undefined){
        timeout = rto;
    }

    if(rpc === undefined){
        throw "Please fill rpc url";
    }
    
    try{
        const ms = await getRpcSpeed(rpc,timeout);
        return returnSuccess(rpc, ms);
    }catch{
        return returnTimeout(rpc);
    }
}

const getRpcSpeed = async (rpc, rto) => {
    try{
        const dateStart = new Date().getTime();
        const { status, data } = await axios.post(
            rpc,
            {
                "method":"eth_blockNumber",
                "params":[],
                "id":1,
                "jsonrpc":"2.0"
            },{
                headers: {
                    Accept: 'application/json',
                },
                timeout: rto
            }
        ).catch(() => {
            return "timeout";
        });
        const dateEnd = new Date().getTime();

        if(await status !== 200){
            return "timeout";
        }

        if(await data?.result === undefined){
            return "timeout";
        }

        return dateEnd - dateStart;
    }catch{
        throw "timeout";
    }
}

const returnTimeout = (rpc) => {
    return {rpc: rpc, ms: "timeout"};
}

const returnSuccess = (rpc, ms) => {
    return {rpc: rpc, ms: ms};
}

const sortByKey = (array, key) => {
    return array.sort((a, b) => {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}