import { expect } from "chai";
import { ethers } from "hardhat";

describe("RealEstateContracts", function () {
  let token: any;
  let assetManager: any;

  before(async () => {
    const [owner] = await ethers.getSigners();

    // Desplegar el contrato RealEstateToken
    const TokenFactory = await ethers.getContractFactory("RealEstateToken");
    token = await TokenFactory.deploy("1000000000000000000000000");

    // Desplegar el contrato RealEstateAssetManager con la dirección del token
    const AssetManagerFactory = await ethers.getContractFactory("RealEstateAssetManager");
    assetManager = await AssetManagerFactory.deploy(token.address);
  });

  describe("Deployment", function () {
    it("Debe tener el suministro inicial correcto", async function () {
      const totalSupply = await token.totalSupply();
      expect(totalSupply.toString()).to.equal("1000000000000000000000000");
    });

    it("Debe asignar el token correctamente al gestor de activos", async function () {
      const tokenAddress = await assetManager.token();
      expect(tokenAddress).to.equal(token.address);
    });
  });

  describe("Gestión de Activos", function () {
    it("Debe permitir agregar un nuevo activo", async function () {
      const [owner] = await ethers.getSigners();
      await token.approve(assetManager.address, "1000000000000000000");

      await assetManager.agregarActivo("Edificio A", "1000000000000000000");
      const asset = await assetManager.activos(0);

      expect(asset.nombre).to.equal("Edificio A");
      expect(asset.valor.toString()).to.equal("1000000000000000000");
      expect(asset.propietario).to.equal(owner.address);
    });

    it("Debe permitir transferir un activo a un nuevo propietario", async function () {
      const [owner, newOwner] = await ethers.getSigners();

      await assetManager.transferirActivo(0, newOwner.address);
      const asset = await assetManager.activos(0);

      expect(asset.propietario).to.equal(newOwner.address);
    });
  });
});
