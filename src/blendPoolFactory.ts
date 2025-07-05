import * as StellarSdk from "@stellar/stellar-sdk";


/**
 * Llama a la función deploy() del contrato pool-factory en Blend.
 * @param sourceSecretKey Clave secreta de la cuenta que desplegará la pool (testnet).
 * @param factoryContractId ID del contrato pool-factory.
 * @param deployParams Parámetros para la función deploy().
 * @returns Hash de la transacción enviada
 */
export async function deployPool(
  sourceSecretKey: string,
  factoryContractId: string,
  deployParams: any
): Promise<string> {
  // Validar claves
  if (!StellarSdk.Keypair.fromSecret(sourceSecretKey)) throw new Error('Clave secreta inválida');
  if (!factoryContractId) throw new Error('ID de contrato inválido');

  // Configuración correcta del RPC usando Server de stellar-sdk
  const networkRPC = "https://soroban-testnet.stellar.org";
  const server = new StellarSdk.rpc.Server(networkRPC);
  const network_passphrase = StellarSdk.Networks.TESTNET;

  const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
  // const account = await server.loadAccount(sourceKeypair.publicKey());

  // Construir la operación de invocación de contrato
  // const tx = new TransactionBuilder(account, {
  //   fee: await server.fetchBaseFee(),
  //   networkPassphrase: Networks.TESTNET,
  // })
  //   .addOperation(Operation.invokeHostFunction({
  //     function: xdr.HostFunction.hostFunctionTypeInvokeContract(),
  //     parameters: [
  //       // Aquí debes construir los parámetros según el ABI del contrato Blend
  //       // xdr.ScVal.scvAddress(xdr.ScAddress.fromString(factoryContractId)),
  //       // xdr.ScVal.scvSymbol('deploy'),
  //       // ...otros parámetros
  //     ],
  //   }))
  //   .setTimeout(60)
  //   .build();

  // tx.sign(sourceKeypair);

  // try {
  //   const response = await server.submitTransaction(tx);
  //   return response.hash;
  // } catch (error) {
  //   throw new Error(`Error al desplegar la pool: ${error}`);
  // }
  return ''
}

/**
 * Ejemplo de parámetros para crear una pool en Blend
 */
export const exampleDeployParams = {
  oracle: 'G...ORACLEADDRESS',
  admin: 'G...ADMINADDRESS',
  reserves: [
    {
      decimals: 7,
      cFactor: 8000000, // 0.8 en 7 decimales
      lFactor: 2000000, // 0.2 en 7 decimales
      util: 7000000,    // 0.7 en 7 decimales
      maxUtil: 9000000, // 0.9 en 7 decimales
      rBase: 100000,    // 0.01 en 7 decimales
      rOne: 200000,     // 0.02 en 7 decimales
      rTwo: 300000,     // 0.03 en 7 decimales
      rThree: 400000,   // 0.04 en 7 decimales
      reactivity: 1000000,
      collateralCap: 1000000000,
      enabled: true,
    },
    // ...otros assets
  ],
  emissions: [
    {
      resIndex: 0,
      resType: 1, // 0: liabilities, 1: supply
      share: 5000000, // 50% en 7 decimales
    },
    // ...otros
  ],
};
