import { Phone } from "@/@types/Phone";
import Input from "@/components/Input";
import PhoneCard from "@/components/PhoneCard";
import Spinner from "@/components/Spinner";
import { usePhoneStore } from "@/stores/PhoneStore";
import { fetchApi } from "@/utils/fetchApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { phones, setPhones } = usePhoneStore();

  useEffect(() => {
    fetchApi<Phone[]>("/phone/getAll").then((response) => {
      setPhones(response?.data ?? []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="mt-14 text-5xl font-light text-zinc-800">
        Olá, <span className="text-orange-400">Fulano</span>
      </h1>
      <div className="mt-4">
        <Input />
      </div>
      <div className="w-full mt-16">
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="h-16 w-16 border-[6px]" />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
            {phones.map((phone) => (
              <PhoneCard key={phone.id} {...phone} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}