// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title RealEstateToken
 * @dev Contrato para tokenizar propiedades inmobiliarias utilizando ERC20
 */
contract RealEstateToken is ERC20 {
    address public owner;

    // Estructura que representa una propiedad
    struct Propiedad {
        uint256 valor; // Valor de la propiedad en wei
        uint256 tokens; // Cantidad de tokens asignados a la propiedad
        address propietario; // Dirección del propietario de la propiedad
        bool tokenizada; // Estado de tokenización de la propiedad
    }

    uint256 public contadorPropiedades; // Contador de propiedades registradas
    mapping(uint256 => Propiedad) public propiedades; // Mapeo de ID de propiedad a Propiedad

    event PropiedadRegistrada(uint256 indexed idPropiedad, address indexed propietario, uint256 valor);
    event PropiedadTokenizada(uint256 indexed idPropiedad, uint256 tokens);

    /**
     * @dev Constructor que inicializa el suministro inicial de tokens
     * @param initialSupply Suministro inicial de tokens
     */
    constructor(uint256 initialSupply) ERC20("Real Estate Token", "RET") {
        _mint(msg.sender, initialSupply);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can mint tokens");
        _;
    }
        
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Función para registrar una nueva propiedad
     * @param valor Valor de la propiedad en wei
     */
    function registrarPropiedad(uint256 valor) external {
        require(valor > 0, "El valor de la propiedad debe ser mayor a 0");

        propiedades[contadorPropiedades] = Propiedad({
            valor: valor,
            tokens: 0,
            propietario: msg.sender,
            tokenizada: false
        });
        emit PropiedadRegistrada(contadorPropiedades, msg.sender, valor);
        contadorPropiedades++;
    }

    /**
     * @dev Función para tokenizar una propiedad registrada
     * @param idPropiedad ID de la propiedad a tokenizar
     */
    function tokenizarPropiedad(uint256 idPropiedad) external {
        Propiedad storage propiedad = propiedades[idPropiedad];
        require(!propiedad.tokenizada, "Propiedad ya tokenizada");
        require(propiedad.propietario == msg.sender, "Solo el propietario puede tokenizar la propiedad");

        // La cantidad de tokens asignados es igual al valor de la propiedad en wei
        uint256 tokens = propiedad.valor;
        propiedad.tokens = tokens;
        propiedad.tokenizada = true;
        _mint(propiedad.propietario, tokens);

        emit PropiedadTokenizada(idPropiedad, tokens);
    }

    /**
     * @dev Función para transferir tokens de propiedad a otra dirección
     * @param to Dirección del destinatario
     * @param cantidad Cantidad de tokens a transferir
     */
    function transferirTokenPropiedad(address to, uint256 cantidad) external {
        require(to != address(0) && balanceOf(msg.sender) >= cantidad, "Transferencia invalida");

        _transfer(msg.sender, to, cantidad);
    }

    /**
     * @dev Obtener detalles de una propiedad registrada
     * @param idPropiedad ID de la propiedad
     * @return valor Valor de la propiedad
     * @return tokens Cantidad de tokens asignados a la propiedad
     * @return propietario Dirección del propietario de la propiedad
     * @return tokenizada Estado de tokenización de la propiedad
     */
    function obtenerDetallesPropiedad(uint256 idPropiedad) external view returns (uint256, uint256, address, bool) {
        Propiedad storage propiedad = propiedades[idPropiedad];
        return (propiedad.valor, propiedad.tokens, propiedad.propietario, propiedad.tokenizada);
    }

    /**
     * @dev Consultar propiedades por propietario
     * @param propietario Dirección del propietario
     * @return ids Array de IDs de propiedades pertenecientes al propietario
     */
    function consultarPropiedadesPorPropietario(address propietario) external view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](contadorPropiedades);
        uint256 count = 0;
        for (uint256 i = 0; i < contadorPropiedades; i++) {
            if (propiedades[i].propietario == propietario) {
                ids[count] = i;
                count++;
            }
        }
        return ids;
    }

    /**
     * @dev Consultar propiedades por valor
     * @param valor Valor de la propiedad
     * @return ids Array de IDs de propiedades con el valor especificado
     */
    function consultarPropiedadesPorValor(uint256 valor) external view returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](contadorPropiedades);
        uint256 count = 0;
        for (uint256 i = 0; i < contadorPropiedades; i++) {
            if (propiedades[i].valor == valor) {
                ids[count] = i;
                count++;
            }
        }
        return ids;
    }
}
