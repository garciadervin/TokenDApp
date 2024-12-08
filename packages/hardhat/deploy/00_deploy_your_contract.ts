import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

/**
 * @dev Función de despliegue para el contrato RealEstateToken
 * @param hre El entorno de ejecución de Hardhat
 */
const deployRealEstateContracts: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Suministro inicial del token en formato string
  const initialSupply = "1000000000000000000000000"; // 1,000,000 con 18 decimales

  // Desplegar el contrato RealEstateToken
  const tokenDeployment = await deploy("RealEstateToken", {
    from: deployer,
    args: [initialSupply],
    log: true,  // Habilitar logs para ver los detalles del despliegue
    autoMine: true,  // Minar la transacción inmediatamente
  });

  console.log("RealEstateToken deployed to:", tokenDeployment.address);

  // Obtener la instancia del contrato desplegado
  const tokenContract = await ethers.getContractAt("RealEstateToken", tokenDeployment.address);

  // Mostrar información sobre el suministro inicial del token
  const totalSupply = await tokenContract.totalSupply();
  console.log("RealEstateToken initial supply:", totalSupply.toString());
};

export default deployRealEstateContracts;

// Las etiquetas son útiles si tienes múltiples archivos de despliegue y solo quieres ejecutar uno de ellos.
// Por ejemplo: yarn deploy --tags RealEstate
deployRealEstateContracts.tags = ["RealEstate"];
