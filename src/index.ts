// Entry point for the app
import { createWallet, fundAccountWithFriendbot, createAndFundWallet } from './createWallet';

async function main() {
  console.log('Creando una nueva wallet de Stellar...');
  
  try {
    // Método 1: Crear wallet y luego financiarla por separado
    console.log('\n--- Método 1: Crear wallet y financiarla por separado ---');
    const wallet = createWallet();
    console.log('Nueva wallet creada:');
    console.log(`Clave pública: ${wallet.publicKey}`);
    console.log(`Clave secreta: ${wallet.secretKey}`);
    
    console.log('\nFinanciando la wallet con Friendbot...');
    const fundingResponse = await fundAccountWithFriendbot(wallet.publicKey);
    console.log('Respuesta de financiación:', fundingResponse);
    
    // Método 2: Crear y financiar wallet en un solo paso
    console.log('\n--- Método 2: Crear y financiar wallet en un solo paso ---');
    const result = await createAndFundWallet();
    console.log('Nueva wallet creada y financiada:');
    console.log(`Clave pública: ${result.wallet.publicKey}`);
    console.log(`Clave secreta: ${result.wallet.secretKey}`);
    console.log('Respuesta de financiación:', result.fundingResponse);
    
    console.log('\n¡Proceso completado con éxito!');
  } catch (error) {
    console.error('Error durante el proceso:', error);
  }
}

// Ejecutar la función principal
main();
