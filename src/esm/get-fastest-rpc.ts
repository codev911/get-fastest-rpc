import axios from "axios";

const chainRpcs = require('../chainRpcs').default;

export const getBestRpcByChainId = async (chainId: number, ...rto: number[]): Promise<any> => {
    const alive: any[] = [];
    const listrpc = chainRpcs[chainId]?.rpcs;
    let timeout = 3000;

    if(chainId === undefined){
        throw "Please fill chain id";
    }

    if(rto.length === 1){
        timeout = rto[0];
    }

    if(listrpc.length === 0){
        throw "unsupported chain id, please use `getBestRpc`";
    }

    const getAlive = await testAllRpc(listrpc, timeout);
    getAlive.forEach((result: any) => {
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

export const testAllRpcByChainId = async (chainId: number, ...rto: number[]): Promise<any> => {
    const run: any[] = [];
    const listrpc = chainRpcs[chainId]?.rpcs;
    let timeout = 3000;

    if(chainId === undefined){
        throw "Please fill chain id";
    }

    if(rto.length === 1){
        timeout = rto[0];
    }

    if(listrpc.length === 0){
        throw "unsupported chain id, please use `getBestRpc`";
    }

    listrpc.forEach((rpc: string) => {
        run.push(testRpc(rpc, timeout));
    });

    const value = await Promise.all(run);
    return value;
}

export const getBestRpc = async (listrpc: string[], ...rto: number[]): Promise<string> => {
    const alive: any[] = [];
    let timeout = 3000;

    if(rto.length === 1){
        timeout = rto[0];
    }

    const getAlive = await testAllRpc(listrpc, timeout);
    getAlive.forEach((result: any) => {
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

export const testAllRpc = async (listrpc: string[], ...rto: number[]): Promise<any> => {
    const run: any[] = [];
    let timeout = 3000;

    if(rto.length === 1){
        timeout = rto[0];
    }
    
    listrpc.forEach(rpc => {
        run.push(testRpc(rpc, timeout));
    });

    const value = await Promise.all(run);
    return value;
}

export const testRpc = async (rpc: string, ...rto:number[]): Promise<any> => {
    let timeout = 3000;

    if(rto.length === 1){
        timeout = rto[0];
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

const getRpcSpeed = async (rpc: string, ...rto: number[]): Promise<any> => {
    try{
        const dateStart = new Date().getTime();
        await axios.post(
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
                timeout: rto[0]
            }
        ).catch(() => {
            return "timeout";
        }).then((res: any) => {
            const dateEnd = new Date().getTime();

            if(res?.status !== 200){
                return "timeout";
            }

            if(res?.result === undefined){
                return "timeout";
            }

            return dateEnd - dateStart;
        });
    }catch{
        throw "timeout";
    }
}

const returnTimeout = (rpc: string) => {
    return {rpc: rpc, ms: "timeout"};
}

const returnSuccess = (rpc: string, ms: number) => {
    return {rpc: rpc, ms: ms};
}

const sortByKey = (array: any[], key: string) => {
    return array.sort((a, b) => {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}