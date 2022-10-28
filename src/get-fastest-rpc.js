const axios = require('axios');

export const testAllRpc = async (listrpc, rto) => {
    const run = [];

    listrpc.forEach(rpc => {
        run.push(testRpc(rpc, rto));
    });

    const value = await Promise.all(run);
    return value;
}

export const testRpc = async (rpc, rto) => {
    try{
        const ms = await getRpcSpeed(rpc,rto);
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