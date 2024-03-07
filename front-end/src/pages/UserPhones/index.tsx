import Input from "@/components/Input";
import { fetchApi } from "@/utils/fetchApi";
import { useEffect, useState } from "react";
import { Phone } from "@/@types/Phone";
import Spinner from "@/components/Spinner";
import PhoneCard from "@/components/PhoneCard";
import { useUserPhoneStore } from "@/stores/UserPhoneStore";
import { Plus } from "@phosphor-icons/react";
import AddPhoneDialog from "@/components/AddPhoneDialog";
import Header from "@/components/Header";

export default function UserPhones() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddPhoneDialogOpen, setIsAddPhoneDialogOpen] =
    useState<boolean>(false);
  const { userPhones, setUserPhones } = useUserPhoneStore();

  useEffect(() => {
    fetchApi<Phone[]>("/phone/getUserPhones").then((response) => {
      setUserPhones(response?.data ?? []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-4/5 mx-auto max-w-[1250px] pb-16 pt-8">
      <Header />
      <h1 className="mt-14 text-5xl font-light text-zinc-800">
        Seus <span className="text-orange-400">produtos</span>
      </h1>
      <div className="mt-4">
        <Input />
      </div>
      <button
        className="mt-16 bg-orange-400 text-white p-3 rounded-md hover:bg-orange-300 transition-colors flex gap-2 items-center"
        onClick={() => setIsAddPhoneDialogOpen(true)}
      >
        <Plus className="text-white w-6 h-6" weight="bold" />
        <p>Adicionar novo produto</p>
      </button>
      <div className="mt-4">
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="h-16 w-16 border-[6px]" />
          </div>
        ) : userPhones.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
            {userPhones.map((phone) => (
              <PhoneCard key={phone.id} {...phone} isAuthor />
            ))}
          </div>
        ) : (
          <p className="text-xl text-zinc-400">
            Você não tem nenhum produto à venda
          </p>
        )}
      </div>
      <AddPhoneDialog
        isDialogOpen={isAddPhoneDialogOpen}
        setIsDialogOpen={setIsAddPhoneDialogOpen}
      />
    </div>
  );
}
