"use client";

import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
import type { NextPage } from "next";
import { PlusCircleIcon, CurrencyDollarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

const Home: NextPage = () => {
  // Obtiene la dirección conectada del usuario
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center flex-grow pt-16 bg-white px-16">
      <div className="text-center mb-10">
        {/* Encabezado de la página */}
        <h1 className="text-5xl font-extrabold mb-5 text-gray-900">
          Gestión de Activos Inmobiliarios
        </h1>
        <h2 className="text-2xl mb-6 text-gray-800">
          Bienvenido a nuestra plataforma
        </h2>

        {/* Información de la dirección conectada */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-2 mb-2">
          <p className="text-lg font-medium text-gray-600">Dirección conectada:</p>
          <div className="px-4 py-2 border rounded-full text-lg font-mono text-gray-800 shadow-sm">
            <Address address={connectedAddress} />
          </div>
          <p className="text-lg font-medium text-gray-600 ml-4">Saldo de Tokens RET:</p>
          <div className="px-4 py-2 bg-white border border-gray-300 rounded-full text-lg font-mono font-bold text-gray-800 shadow-sm">
            <Balance address={connectedAddress} />
          </div>
        </div>
      </div>

      {/* División */}
      <div className="border-t border-gray-200 w-full mt-2 mb-2" />

      {/* Título de las Opciones Disponibles */}
      <h3 className="text-xl font-semibold text-center text-gray-700 py-1 mb-0">
        Opciones Disponibles
      </h3>

      {/* Opciones principales */}
      <div className="flex-grow bg-white w-full px-12 py-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Opción: Registrar y Tokenizar Propiedad */}
          <div className="flex flex-col bg-white px-8 py-10 text-center items-center rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <Link href="/tokenizar" legacyBehavior>
              <a className="flex flex-col items-center">
                <PlusCircleIcon className="h-10 w-10 text-blue-500 mb-4" />
                <p className="text-lg font-semibold text-gray-700">Registrar y Tokenizar Propiedad</p>
              </a>
            </Link>
          </div>

          {/* Opción: Transferir Token Propiedad */}
          <div className="flex flex-col bg-white px-8 py-10 text-center items-center rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <Link href="/transferir-token" legacyBehavior>
              <a className="flex flex-col items-center">
                <CurrencyDollarIcon className="h-10 w-10 text-green-500 mb-4" />
                <p className="text-lg font-semibold text-gray-700">Transferir Token Propiedad</p>
                </a>
              </Link>
          </div>

          {/* Opción: Obtener y Consultar Detalles Propiedad */}
          <div className="flex flex-col bg-white px-8 py-10 text-center items-center rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <Link href="/detalles-propiedad" legacyBehavior>
              <a className="flex flex-col items-center">
                <InformationCircleIcon className="h-10 w-10 text-purple-500 mb-4" />
                <p className="text-lg font-semibold text-gray-700">Obtener y Consultar Detalles Propiedad</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
