import Input from "@/components/Input";
import { fetchApi } from "@/utils/fetchApi";
import { useEffect, useState } from "react";
import { Phone } from "@/@types/Phone";
import Spinner from "@/components/Spinner";
import PhoneCard from "@/components/PhoneCard";
import { usePhoneStore } from "@/stores/PhoneStore";

export default function UserPhones() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { phones, setPhones } = usePhoneStore();

  useEffect(() => {
    fetchApi<Phone[]>("/phone/getUserPhones").then((response) => {
      setPhones(response?.data ?? []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="mt-14 text-5xl font-light text-zinc-800">
        Seus <span className="text-orange-400">produtos</span>
      </h1>
      <div className="mt-4">
        <Input />
      </div>
      <div className="mt-16">
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="h-16 w-16 border-[6px]" />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
            {phones.map((phone) => (
              <PhoneCard key={phone.id} {...phone} isAuthor />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}