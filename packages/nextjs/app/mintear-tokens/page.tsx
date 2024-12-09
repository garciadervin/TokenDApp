"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth"; // Importar el hook desde Scaffold-ETH
import { useAccount, useBalance } from "wagmi"; // Importar hooks de wagmi
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";

const MintTokens: NextPage = () => {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");

  const { address } = useAccount(); // Obtener la dirección de la cuenta conectada
  const { data: balance } = useBalance({ address }); // Obtener el balance de la cuenta conectada

  const { writeContractAsync: mint } = useScaffoldWriteContract("RealEstateToken");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validar que los tokens sean válidos
      const tokens = BigInt(tokenAmount);
      if (tokens <= 0n || tokens % 1000n !== 0n) {
        alert("Cantidad de tokens no válida. Debe ser un múltiplo de 1000 y mayor a 0.");
        return;
      }

      await mint({
        functionName: "mint",
        args: [recipientAddress, tokens],
      });
    } catch (e: any) {
      console.error("Error minteando los tokens:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Mintear Tokens
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Introduce los detalles para mintear nuevos tokens.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="address" className="text-gray-600">Dirección</label>
            <input
              type="text"
              id="address"
              placeholder="Dirección de la cuenta"
              className="input input-bordered w-full"
              value={address ?? ""}
              readOnly
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="balance" className="text-gray-600">Balance</label>
            <input
              type="text"
              id="balance"
              placeholder="Balance de la cuenta"
              className="input input-bordered w-full"
              value={balance?.formatted ?? ''}
              readOnly
            />
          </div>
          <div className="flex flex-col mb-4">
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
          <div className="flex flex-col mb-4">
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
            <span>Mintear Tokens</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MintTokens;
