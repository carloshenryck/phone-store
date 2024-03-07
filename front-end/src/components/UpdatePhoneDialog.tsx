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
import { useEffect, useState } from "react";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { fetchApi } from "@/utils/fetchApi";
import { toast } from "sonner";
import { Phone } from "@/@types/Phone";
import { useUserPhoneStore } from "@/stores/UserPhoneStore";
import Spinner from "./Spinner";

interface AddPhoneDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  phoneData: Phone;
}

interface Variation {
  [key: string]: string;
}

export default function UpdatePhoneDialog({
  isDialogOpen,
  setIsDialogOpen,
  phoneData,
}: AddPhoneDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserPhones } = useUserPhoneStore();
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [variations, setVariations] = useState<Variation[]>([
    { price: "", color: "", img: "" },
  ]);

  const editPhone = async () => {
    setIsLoading(true);

    const normalizedVariations = variations.map((variation) => ({
      ...variation,
      price: +variation.price,
    }));

    const response = await fetchApi<Phone[]>(
      `/phone/${phoneData.id}`,
      "PATCH",
      {
        name,
        brand,
        model,
        data: normalizedVariations,
      }
    );

    setIsLoading(false);

    if (response?.data) {
      toast("Alterado com sucesso!", {
        style: {
          background: "green",
          color: "white",
          border: "none",
        },
      });
      setUserPhones(response.data);
      setIsDialogOpen(false);
    }
  };

  const handleVariationsChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...variations];
    data[index][event.target.name] = event.target.value;
    setVariations(data);
  };

  useEffect(() => {
    if (isDialogOpen) {
      const variations = phoneData.data.map((variation) => ({
        ...variation,
        price: variation.price.toString(),
      }));
      setName(phoneData.name);
      setBrand(phoneData.brand);
      setModel(phoneData.model);
      setVariations(variations);
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[50rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Celular</DialogTitle>
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
                <p className="text-orange-400 font-medium mt-4">
                  Variação {(index + 1).toString().padStart(2, "0")}
                </p>
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
            type="submit"
            className="bg-orange-400 hover:bg-orange-300 disabled:bg-orange-300 transition-colors"
            onClick={editPhone}
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
