import { Phone, phoneVariations } from "@/@types/Phone";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { convertToBrl } from "@/utils/convetToCurrency";
import { fetchApi } from "@/utils/fetchApi";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [phones, setPhones] = useState<Phone[]>([]);

  const getCheapestPrice = (variations: phoneVariations[]): number => {
    const prices = variations.map((variation) => variation.price);
    return Math.min(...prices);
  };

  useEffect(() => {
    fetchApi<Phone[]>("/phone/getAll").then((response) => {
      setPhones(response?.data ?? []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="pt-8 w-4/5 mx-auto max-w-[1250px] pb-16">
      <Header />
      <h1 className="mt-14 text-5xl font-light text-zinc-800">
        Olá, <span className="text-orange-400">Fulano</span>
      </h1>
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Pesquise por celulares"
          className="bg-white py-3 w-[35rem] rounded-lg pl-14 pr-2 text-zinc-800 outline-orange-300"
        />
        <MagnifyingGlass
          className="w-6 h-6 text-orange-400 absolute top-1/2 -translate-y-1/2 left-4"
          weight="bold"
        />
      </div>
      <div className="w-full mt-16">
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="h-16 w-16 border-[6px]" />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
            {phones.map((phone) => (
              <button className="bg-white flex justify-between h-96 flex-col px-4 py-8">
                <div className="w-full text-start flex flex-col grow">
                  <img
                    className="h-3/6 aspect-square self-center grow"
                    src=""
                    alt="celular"
                  />
                  <p className="text-sm text-gray-500">{phone.brand}</p>
                  <p>{phone.name}</p>
                </div>
                <div className="mt-8 text-start">
                  <p className="text-base text-gray-500">A partir de</p>
                  <p className="text-2xl font-medium text-orange-400">
                    {convertToBrl(getCheapestPrice(phone.data))}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
