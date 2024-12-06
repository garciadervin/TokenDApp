//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./RealEstateToken.sol";

// Contrato para la gestión de activos inmobiliarios tokenizados
contract RealEstateAssetManager {
    // Estructura que representa un activo inmobiliario
    struct Activo {
        string nombre; // Nombre del activo
        uint256 valor; // Valor del activo en tokens RET
        address propietario; // Dirección del propietario del activo
    }

    // Array dinámico de activos
    Activo[] public activos;

    // Instancia del token RealEstateToken
    RealEstateToken public token;

    // Constructor que inicializa la dirección del contrato del token
    constructor(address tokenAddress) {
        token = RealEstateToken(tokenAddress); // Asigna el contrato del token
    }

    // Función para añadir un nuevo activo
    function agregarActivo(string memory nombre, uint256 valor) public {
        // Crea un nuevo activo y lo añade al array de activos
        Activo memory nuevoActivo = Activo({
            nombre: nombre,
            valor: valor,
            propietario: msg.sender
        });
        activos.push(nuevoActivo);
        
        // Transfiere tokens del usuario al contrato para reflejar el valor del activo
        token.transferFrom(msg.sender, address(this), valor);
    }

    // Función para transferir la propiedad de un activo
    function transferirActivo(uint256 idActivo, address nuevoPropietario) public {
        // Verifica que el remitente sea el propietario actual del activo
        require(msg.sender == activos[idActivo].propietario, "No eres el propietario del activo");
        activos[idActivo].propietario = nuevoPropietario; // Actualiza el propietario del activo
    }
}
