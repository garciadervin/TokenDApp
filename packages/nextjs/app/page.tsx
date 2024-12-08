"use client";

import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
import type { NextPage } from "next";
import Link from "next/link";
import { BuildingOfficeIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  // Obtiene la dirección conectada del usuario
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col items-center flex-grow pt-10">
      <div className="px-5">
        {/* Encabezado */}
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Bienvenido a</span>
          <span className="block text-4xl font-bold">Gestión de Activos Inmobiliarios</span>
        </h1>

        {/* Dirección conectada */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-2">
          <p className="my-2 font-medium">Dirección conectada:</p>
          <Address address={connectedAddress} />
        </div>

        {/* Saldo */}
        <div className="text-center">
          <p className="my-2 font-medium">Saldo de Tokens RET:</p>
          <Balance address={connectedAddress} />
        </div>
      </div>

      {/* Opciones principales */}
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
          {/* Gestión de Activos */}
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <BuildingOfficeIcon className="h-8 w-8 fill-secondary" />
            <p>
              Administra tus activos inmobiliarios{" "}
              <Link href="/assets" passHref className="link">
                aquí
              </Link>.
            </p>
          </div>

          {/* Explorador de Bloques */}
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <CurrencyDollarIcon className="h-8 w-8 fill-secondary" />
            <p>
              Revisa tus transacciones en el{" "}
              <Link href="/blockexplorer" passHref className="link">
                Explorador de Bloques
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
