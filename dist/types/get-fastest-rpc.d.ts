export function getBestRpcByChainId(chainId: number, ...rto: number): Promise<string>;
export function testAllRpcByChainId(chainId: number, ...rto: number): Promise<any>;
export function getBestRpc(listrpc: any, ...rto: number): Promise<string>;
export function testAllRpc(listrpc: any, ...rto: number): Promise<any>;
export function testRpc(rpc: string, ...rto: number): Promise<{
    rpc: string;
    ms: number;
}>;
//# sourceMappingURL=get-fastest-rpc.d.ts.map