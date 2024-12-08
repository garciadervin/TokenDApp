"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";  // Importar el hook desde Scaffold-ETH
import { useAccount, useBalance } from "wagmi";  // Importar hooks de wagmi
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const TransferPropertyToken = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const { address } = useAccount();  // Obtener la dirección de la cuenta conectada
  const { data: balance } = useBalance({ address });  // Obtener el balance de la cuenta conectada

  const { writeContractAsync: transferirTokenPropiedad } = useScaffoldWriteContract("RealEstateToken");

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await transferirTokenPropiedad({
        functionName: "transferirTokenPropiedad",
        args: [recipientAddress, BigInt(tokenAmount)],
      });
      alert("Tokens transferidos exitosamente!");
    } catch (e) {
      console.error("Error transfiriendo los tokens:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Transferir Token Propiedad
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Introduce los detalles para transferir tokens de propiedad a otra dirección.
        </p>

        <form className="space-y-4" onSubmit={handleTransfer}>
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
            <label htmlFor="recipientAddress" className="text-gray-600">Dirección del Destinatario</label>
            <input
              type="text"
              id="recipientAddress"
              placeholder="Dirección del Destinatario"
              className="input input-bordered w-full"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
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
            <CurrencyDollarIcon className="h-6 w-6 mr-2" />
            <span>Transferir Tokens</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferPropertyToken;
