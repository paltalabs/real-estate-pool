import { Keypair, Horizon } from '@stellar/stellar-sdk';

/**
 * Crea una nueva wallet (par de claves) de Stellar
 * @returns Un objeto con la clave pública y la clave secreta
 */
export function createWallet() {
  // Generar un nuevo par de claves aleatorio
  const keypair = Keypair.random();
  
  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret()
  };
}

/**
 * Financia una cuenta en la red de prueba de Stellar usando Friendbot
 * @param publicKey La clave pública de la cuenta a financiar
 * @returns Una promesa que se resuelve con la respuesta de Friendbot
 */
export async function fundAccountWithFriendbot(publicKey: string): Promise<any> {
  try {
    // Configurar el servidor Horizon para la red de prueba
    const server = new Horizon.Server('https://horizon-testnet.stellar.org');
    
    // Usar Friendbot para financiar la cuenta
    const response = await server.friendbot(publicKey).call();
    return response;
  } catch (error) {
    console.error('Error al financiar la cuenta con Friendbot:', error);
    throw error;
  }
}

/**
 * Crea una nueva wallet y la financia automáticamente con Friendbot
 * @returns Una promesa que se resuelve con la wallet creada y la respuesta de financiación
 */
export async function createAndFundWallet() {
  // Crear una nueva wallet
  const wallet = createWallet();
  
  // Financiar la wallet con Friendbot
  const fundingResponse = await fundAccountWithFriendbot(wallet.publicKey);
  
  return {
    wallet,
    fundingResponse
  };
}