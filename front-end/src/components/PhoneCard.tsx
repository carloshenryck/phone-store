import { Phone, phoneVariations } from "@/@types/Phone";
import { convertToBrl } from "@/utils/convetToCurrency";
import {
  DotsThreeCircle,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import DeletePhoneAlert from "./DeletePhoneAlert";
import { fetchApi } from "@/utils/fetchApi";
import { toast } from "sonner";
import { useUserPhoneStore } from "@/stores/UserPhoneStore";
interface PhoneCardProps extends Phone {
  isAuthor?: boolean;
}

export default function PhoneCard({
  id,
  brand,
  data,
  name,
  isAuthor,
}: PhoneCardProps) {
  const { setUserPhones } = useUserPhoneStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const getCheapestPrice = (variations: phoneVariations[]): number => {
    const prices = variations.map((variation) => variation.price);
    return Math.min(...prices);
  };

  const deletePhone = async () => {
    setIsLoading(true);
    const response = await fetchApi<Phone[]>(`/phone/${id}`, "DELETE");
    setIsAlertOpen(false);
    setIsLoading(false);

    if (response?.data) {
      toast("Removido com sucesso!", {
        style: {
          background: "green",
          color: "white",
          border: "none",
        },
      });
      setUserPhones(response.data);
    }
  };

  return (
    <button className="bg-white flex justify-between h-[25rem] flex-col px-4 py-8 rounded-md relative">
      {isAuthor && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute right-4 top-4">
              <DotsThreeCircle
                className="h-8 w-8 text-orange-300 cursor-pointer"
                weight="fill"
              />
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <PencilSimple
                    className="w-4 h-4 text-zinc-700"
                    weight="bold"
                  />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2 items-center"
                  onClick={() => setIsAlertOpen(true)}
                >
                  <TrashSimple className="w-4 h-4 text-red-500" weight="bold" />
                  <p className="text-red-500">Excluir</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
          <DeletePhoneAlert
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            deleteFunction={deletePhone}
            isLoading={isLoading}
          />
        </>
      )}
      <div className="w-full text-start flex flex-col grow">
        <img
          className="aspect-square h-0 self-center grow object-contain"
          src={data[0].img}
          alt="celular"
        />
        <p className="text-sm text-gray-500 mt-8">{brand}</p>
        <p className="truncate">{name}</p>
      </div>
      <div className="mt-8 text-start">
        <p className="text-base text-gray-500">A partir de</p>
        <p className="text-2xl font-medium text-orange-400">
          {convertToBrl(getCheapestPrice(data))}
        </p>
      </div>
    </button>
  );
}
