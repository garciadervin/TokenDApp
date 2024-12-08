"use client";

import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth"; // Importar el hook desde Scaffold-ETH
import { useAccount, useBalance } from "wagmi"; // Importar hooks de wagmi
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const PropertyDetails: React.FC = () => {
  const [searchType, setSearchType] = useState<string>("id");
  const [propertyId, setPropertyId] = useState<string>("0");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [propertyValue, setPropertyValue] = useState<string>("0");
  const [searchId, setSearchId] = useState<string | null>(null);
  const [searchOwner, setSearchOwner] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { address } = useAccount(); // Obtener la dirección de la cuenta conectada
  const { data: balance } = useBalance({ address }); // Obtener el balance de la cuenta conectada

  const { data: propiedad, isLoading, error } = useScaffoldReadContract({
    contractName: "RealEstateToken",
    functionName: "obtenerDetallesPropiedad",
    args: [BigInt(searchId ?? "0")], // Asegúrate de proporcionar el argumento requerido siempre
  });

  const { data: propiedadesPorPropietario } = useScaffoldReadContract({
    contractName: "RealEstateToken",
    functionName: "consultarPropiedadesPorPropietario",
    args: [searchOwner ?? ""],
  });

  const { data: propiedadesPorValor } = useScaffoldReadContract({
    contractName: "RealEstateToken",
    functionName: "consultarPropiedadesPorValor",
    args: [BigInt(searchValue ?? "0")],
  });

  const handleSearch = () => {
    if (searchType === "id") {
      setSearchId(propertyId);
      setSearchOwner(null);
      setSearchValue(null);
    } else if (searchType === "propietario") {
      setSearchOwner(ownerAddress);
      setSearchId(null);
      setSearchValue(null);
    } else if (searchType === "valor") {
      setSearchValue(propertyValue);
      setSearchId(null);
      setSearchOwner(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Desempaquetamos la tupla devuelta por el contrato, con valores por defecto
  const [valor = BigInt(0), tokens = BigInt(0), propietario = "", tokenizada = false] = propiedad ?? [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Obtener y Consultar Detalles Propiedad
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Usa los filtros para buscar y consultar los detalles de las propiedades registradas.
        </p>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-col mb-4">
            <label htmlFor="searchType" className="text-gray-600">Tipo de Búsqueda</label>
            <select
              id="searchType"
              className="input input-bordered w-full"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="id">Por ID</option>
              <option value="propietario">Por Propietario</option>
              <option value="valor">Por Valor</option>
            </select>
          </div>

          {searchType === "id" && (
            <div className="flex flex-col mb-4">
              <label htmlFor="propertyId" className="text-gray-600">ID de la Propiedad</label>
              <input
                type="text"
                id="propertyId"
                placeholder="ID de la Propiedad"
                className="input input-bordered w-full"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
              />
            </div>
          )}
          {searchType === "propietario" && (
            <div className="flex flex-col mb-4">
              <label htmlFor="ownerAddress" className="text-gray-600">Dirección del Propietario</label>
              <input
                type="text"
                id="ownerAddress"
                placeholder="Dirección del Propietario"
                className="input input-bordered w-full"
                value={ownerAddress}
                onChange={(e) => setOwnerAddress(e.target.value)}
              />
            </div>
          )}
          {searchType === "valor" && (
            <div className="flex flex-col mb-4">
              <label htmlFor="propertyValue" className="text-gray-600">Valor de la Propiedad (Wei)</label>
              <input
                type="text"
                id="propertyValue"
                placeholder="Valor de la Propiedad en Wei"
                className="input input-bordered w-full"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
              />
            </div>
          )}

          <button
            className="btn btn-primary w-full flex items-center justify-center"
            onClick={handleSearch}
          >
            <InformationCircleIcon className="h-6 w-6 mr-2" />
            <span>Buscar</span>
          </button>
        </div>

        {/* Tabla de datos */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID Propiedad</th>
                <th className="px-4 py-2">Valor (Wei)</th>
                <th className="px-4 py-2">Cantidad de Tokens</th>
                <th className="px-4 py-2">Propietario</th>
                <th className="px-4 py-2">Estado de Tokenización</th>
              </tr>
            </thead>
            <tbody>
              {searchType === "id" && propiedad && (
                <tr>
                  <td className="border px-4 py-2">{searchId}</td>
                  <td className="border px-4 py-2">{valor.toString()}</td>
                  <td className="border px-4 py-2">{tokens.toString()}</td>
                  <td className="border px-4 py-2">{propietario}</td>
                  <td className="border px-4 py-2">{tokenizada ? 'Tokenizada' : 'No Tokenizada'}</td>
                </tr>
              )}
              {searchType === "propietario" && propiedadesPorPropietario && propiedadesPorPropietario.map((id: bigint) => (
                <tr key={id.toString()}>
                  <td className="border px-4 py-2">{id.toString()}</td>
                </tr>
              ))}
              {searchType === "valor" && propiedadesPorValor && propiedadesPorValor.map((id: bigint) => (
                <tr key={id.toString()}>
                  <td className="border px-4 py-2">{id.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
