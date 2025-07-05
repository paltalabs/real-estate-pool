// Entry point for the app
import { createWallet, fundAccountWithFriendbot, createAndFundWallet, getWalletBalance } from './createWallet';
import { deployPool, exampleDeployParams } from './blendPoolFactory';

async function main() {
  console.log('Creando una nueva wallet de Stellar...');
  
  try {
   
    // --- Ejemplo: Llamar a deploy() del pool-factory ---
    // Reemplaza estos valores por los reales de testnet
    const factoryContractId = 'CDIE73IJJKOWXWCPU5GWQ745FUKWCSH3YKZRF5IQW7GE3G7YAZ773MYK';
    // Usar clave secreta desde variable de entorno si está definida
    const sourceSecretKey = process.env.SECRET_KEY; // O la clave secreta de la cuenta admin
    try {
      if (!sourceSecretKey) {
        throw new Error('La clave secreta de la cuenta fuente no está definida. Por favor, establece la variable de entorno SECRET_KEY.');
      }
      const txHash = await deployPool(sourceSecretKey, factoryContractId, exampleDeployParams);
      console.log('Transacción de deploy enviada. Hash:', txHash);
    } catch (err) {
      console.error('Error al desplegar la pool:', err);
    }
    
    console.log('\n¡Proceso completado con éxito!');


  } catch (error) {
    console.error('Error durante el proceso:', error);
  }
}

// Ejecutar la función principal
main();
