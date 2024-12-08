import { expect } from "chai";
import { ethers } from "hardhat";

describe("RealEstateToken Contract", function () {
  let token: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Desplegar el contrato RealEstateToken
    const TokenFactory = await ethers.getContractFactory("RealEstateToken");
    token = await TokenFactory.deploy("1000000000000000000000000");
    await token.deployed();
  });

  describe("Deployment", function () {
    it("Debe tener el suministro inicial correcto", async function () {
      const totalSupply = await token.totalSupply();
      expect(totalSupply.toString()).to.equal("1000000000000000000000000");
    });

    it("Debe asignar el suministro inicial al deployer", async function () {
      const deployerBalance = await token.balanceOf(owner.address);
      expect(deployerBalance.toString()).to.equal("1000000000000000000000000");
    });
  });

  describe("Registro y tokenización de propiedades", function () {
    it("Debe permitir registrar una nueva propiedad", async function () {
      const valor = "100000000000000000000"; // 100 ETH en wei
      await token.registrarPropiedad(valor);
      const propiedad = await token.obtenerDetallesPropiedad(0);
      expect(propiedad.valor.toString()).to.equal(valor);
      expect(propiedad.propietario).to.equal(owner.address);
    });

    it("Debe permitir tokenizar una propiedad registrada", async function () {
      await token.tokenizarPropiedad(0, 10000);  // Tokenizamos con 10000 tokens
      const propiedad = await token.obtenerDetallesPropiedad(0);
      expect(propiedad.tokens.toString()).to.equal("10000");
      expect(propiedad.tokenizada).to.equal(true);
    });
  });

  describe("Transferencias de tokens de propiedad", function () {
    it("Debe permitir transferir tokens de propiedad", async function () {
      await token.transferirTokenPropiedad(addr1.address, 1000);  // Transferimos 1000 tokens a addr1
      const balanceAddr1 = await token.balanceOf(addr1.address);
      expect(balanceAddr1.toString()).to.equal("1000");
    });

    it("Debe revertir si la cantidad de tokens no es múltiplo de TAMANO_TOKEN", async function () {
      await expect(token.transferirTokenPropiedad(addr1.address, 999)).to.be.revertedWith("Cantidad no válida");
    });

    it("Debe permitir transferir tokens de propiedad a un nuevo propietario", async function () {
      await token.transferirTokenPropiedad(addr2.address, 1000);  // Transferimos 1000 tokens a addr2
      const balanceAddr2 = await token.balanceOf(addr2.address);
      expect(balanceAddr2.toString()).to.equal("1000");
    });
  });
});
