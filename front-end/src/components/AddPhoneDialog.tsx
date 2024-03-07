import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Plus, TrashSimple } from "@phosphor-icons/react";
import { fetchApi } from "@/utils/fetchApi";
import { toast } from "sonner";
import { Phone } from "@/@types/Phone";
import { useUserPhoneStore } from "@/stores/UserPhoneStore";
import Spinner from "./Spinner";

interface AddPhoneDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddPhoneDialog({
  isDialogOpen,
  setIsDialogOpen,
}: AddPhoneDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserPhones } = useUserPhoneStore();
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [variations, setVariations] = useState<
    { [key: string]: string | number }[]
  >([{ price: "", color: "", img: "" }]);

  const addPhone = async () => {
    setIsLoading(true);
    const response = await fetchApi<Phone[]>(`/phone`, "POST", {
      name,
      brand,
      model,
      data: variations,
    });
    setIsLoading(false);

    if (response?.data) {
      toast("Adicionado com sucesso!", {
        style: {
          background: "green",
          color: "white",
          border: "none",
        },
      });
      setUserPhones(response.data);
      setIsDialogOpen(false);
      cleanData();
    }
  };

  const handleVariationsChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...variations];
    let value: string | number = event.target.value;

    if (event.target.name === "price") {
      value = +value;
    }

    data[index][event.target.name] = value;
    setVariations(data);
  };

  const addFields = () => {
    const newfield = { price: "", color: "", img: "" };
    setVariations([...variations, newfield]);
  };

  const removeField = (index: number) => {
    const data = [...variations];
    data.splice(index, 1);
    setVariations(data);
  };

  const cleanData = () => {
    setName("");
    setBrand("");
    setModel("");
    setVariations([{ price: "", color: "", img: "" }]);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[50rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar celular</DialogTitle>
          <DialogDescription>
            Clique em salvar quando você finalizar
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="ex: Samsung Galaxy S23 256 GB"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Marca</Label>
            <Select value={brand} onValueChange={(value) => setBrand(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Samsung">Samsung</SelectItem>
                <SelectItem value="Motorola">Motorola</SelectItem>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Huawei">Huawei</SelectItem>
                <SelectItem value="Xiaomi">Xiaomi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Modelo
            </Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="col-span-3"
              placeholder="ex: Galaxy S23"
            />
          </div>
          <div className="flex flex-col gap-10">
            {variations.map((variation, index) => (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center mt-4">
                  <p className="text-orange-400 font-medium">
                    Variação {(index + 1).toString().padStart(2, "0")}
                  </p>
                  {variations.length > 1 && (
                    <TrashSimple
                      className="text-orange-400 w-5 h-5 cursor-pointer"
                      weight="bold"
                      onClick={() => removeField(index)}
                    />
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`price-${index}`} className="text-right">
                    Valor
                  </Label>
                  <Input
                    id={`price-${index}`}
                    value={variation.price}
                    type="number"
                    name="price"
                    onChange={(e) => handleVariationsChange(index, e)}
                    className="col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`color-${index}`} className="text-right">
                    Cor
                  </Label>
                  <Input
                    id={`color-${index}`}
                    value={variation.color}
                    name="color"
                    onChange={(e) => handleVariationsChange(index, e)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`img-${index}`} className="text-right">
                    Link para imagem
                  </Label>
                  <Input
                    id={`img-${index}`}
                    value={variation.img}
                    name="img"
                    onChange={(e) => handleVariationsChange(index, e)}
                    className="col-span-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            className="border border-solid border-orange-300 bg-transparent text-orange-300 hover:bg-transparent transition-colors flex gap-2"
            onClick={addFields}
            disabled={isLoading}
          >
            <Plus
              className="text-orange-400 w-5 h-5 cursor-pointer"
              weight="bold"
            />
            Adicionar nova variação
          </Button>
          <Button
            type="submit"
            className="bg-orange-400 hover:bg-orange-300 disabled:bg-orange-300 transition-colors"
            onClick={addPhone}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className="h-4 w-4 border-[2px] text-orange-400" />
            ) : (
              <p>Salvar</p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
