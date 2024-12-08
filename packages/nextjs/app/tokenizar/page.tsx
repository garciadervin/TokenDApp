"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";  // Importar el hook desde Scaffold-ETH
import { useAccount, useBalance } from "wagmi";  // Importar hooks de wagmi
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const RegisterTokenizeProperty = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const { address } = useAccount();  // Obtener la dirección de la cuenta conectada
  const { data: balance } = useBalance({ address });  // Obtener el balance de la cuenta conectada

  const { writeContractAsync: registrarPropiedad } = useScaffoldWriteContract("RealEstateToken");
  const { writeContractAsync: tokenizarPropiedad } = useScaffoldWriteContract("RealEstateToken");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Registrar propiedad
      await registrarPropiedad({
        functionName: "registrarPropiedad",
        args: [BigInt(propertyValue)],
      });
      // Tokenizar propiedad
      await tokenizarPropiedad({
        functionName: "tokenizarPropiedad",
        args: [BigInt(propertyId), BigInt(tokenAmount)],
      });
      alert("¡Propiedad registrada y tokenizada exitosamente!");
    } catch (e) {
      console.error("Error en el proceso:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Registrar y Tokenizar Propiedad
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Introduce los detalles de la propiedad para registrarla y asignarle tokens.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-600">Dirección</label>
            <input
              type="text"
              id="address"
              placeholder="Dirección de la cuenta"
              className="input input-bordered w-full"
              value={address}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="balance" className="text-gray-600">Balance</label>
            <input
              type="text"
              id="balance"
              placeholder="Balance de la cuenta"
              className="input input-bordered w-full"
              value={balance?.formatted || ''}
              readOnly
            />
          </div>
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
          <div className="flex flex-col">
            <label htmlFor="tokenAmount" className="text-gray-600">Cantidad de Tokens</label>
            <input
              type="text"
              id="tokenAmount"
              placeholder="Cantidad de Tokens"
              className="input input-bordered w-full"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            <span>Registrar y Tokenizar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTokenizeProperty;
