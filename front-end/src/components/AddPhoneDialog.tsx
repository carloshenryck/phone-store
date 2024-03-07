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
import { Plus } from "@phosphor-icons/react";

interface AddPhoneDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addFunction: () => void;
  isLoading: boolean;
}

export default function AddPhoneDialog({
  isDialogOpen,
  setIsDialogOpen,
}: AddPhoneDialogProps) {
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [variations, setVariations] = useState<{ [key: string]: string }[]>([
    { value: "", color: "", img: "" },
  ]);

  const handleVariationsChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...variations];
    data[index][event.target.name] = event.target.value;
    setVariations(data);
  };

  const addFields = () => {
    const newfield = { value: "", color: "", img: "" };
    setVariations([...variations, newfield]);
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
          <div className="flex justify-between items-center mt-4">
            <p className="text-orange-400 font-medium">Variações</p>
            <Plus
              className="text-orange-400 w-5 h-5 cursor-pointer"
              weight="bold"
              onClick={addFields}
            />
          </div>
          <div className="flex flex-col gap-10">
            {variations.map((variation, index) => (
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`value-${index}`} className="text-right">
                    Valor
                  </Label>
                  <Input
                    id={`value-${index}`}
                    value={variation.value}
                    type="number"
                    name="value"
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
            className="bg-orange-400 hover:bg-orange-300 transition-colors"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
