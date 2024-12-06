// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Importación de la implementación ERC20 desde OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Contrato para el token de bienes raíces
contract RealEstateToken is ERC20 {
    // Constructor que inicializa el suministro inicial del token
    constructor(uint256 initialSupply) ERC20("RealEstateToken", "RET") {
        _mint(msg.sender, initialSupply); // Mintea el suministro inicial al creador del contrato
    }
}
