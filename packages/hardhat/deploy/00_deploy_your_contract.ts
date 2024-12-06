import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployRealEstateContracts: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Desplegar el contrato RealEstateToken
  const initialSupply = "1000000000000000000000000"; // 1,000,000 con 18 decimales en formato string
  const tokenDeployment = await deploy("RealEstateToken", {
    from: deployer,
    args: [initialSupply],
    log: true,  // Habilitar logs para ver los detalles del despliegue
    autoMine: true,  // Minar la transacción inmediatamente
  });

  console.log("RealEstateToken deployed to:", tokenDeployment.address);

  // Desplegar el contrato RealEstateAssetManager utilizando la dirección del token desplegado
  const assetManagerDeployment = await deploy("RealEstateAssetManager", {
    from: deployer,
    args: [tokenDeployment.address],  // Dirección del contrato del token desplegado
    log: true,
    autoMine: true,
  });

  console.log("RealEstateAssetManager deployed to:", assetManagerDeployment.address);

  // Obtener las instancias de los contratos desplegados para interactuar con ellos
  const tokenContract = await ethers.getContractAt("RealEstateToken", tokenDeployment.address);
  const assetManagerContract = await ethers.getContractAt("RealEstateAssetManager", assetManagerDeployment.address);

  // Mostrar información sobre el suministro inicial del token y la dirección del token en el gestor de activos
  console.log("RealEstateToken initial supply:", await tokenContract.totalSupply());
  console.log("RealEstateAssetManager token address:", await assetManagerContract.token());
};

export default deployRealEstateContracts;

// Las etiquetas son útiles si tienes múltiples archivos de despliegue y solo quieres ejecutar uno de ellos.
// Por ejemplo: yarn deploy --tags RealEstate
deployRealEstateContracts.tags = ["RealEstate"];
