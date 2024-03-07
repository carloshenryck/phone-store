import { Phone } from "@/@types/Phone";
import { User } from "@/@types/User";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PhoneCard from "@/components/PhoneCard";
import Spinner from "@/components/Spinner";
import { useUserStore } from "@/stores/UserStore";
import { fetchApi } from "@/utils/fetchApi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { isUserLogged } from "@/utils/verifyToken";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [phones, setPhones] = useState<Phone[]>([]);
  const [brand, setBrand] = useState<string>("");

  const getfilteredPhones = () => {
    if (searchQuery.length === 0 && (brand.length === 0 || brand === "All")) {
      return phones;
    }

    let filteredPhones = [...phones];
    if (searchQuery.length > 0) {
      filteredPhones = filteredPhones.filter((phone) =>
        phone.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (brand.length > 0 && brand !== "All") {
      filteredPhones = filteredPhones.filter((phone) => phone.brand === brand);
    }

    return filteredPhones;
  };

  useEffect(() => {
    if (!isUserLogged()) {
      navigate("/");
      return;
    }

    if (!user) {
      fetchApi<User>("/me").then((response) => {
        if (response?.data) {
          setUser(response.data);
        }
      });
    }

    fetchApi<Phone[]>("/phone/getAll").then((response) => {
      setPhones(response?.data ?? []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-4/5 mx-auto max-w-[1250px] pb-16 pt-8">
      <Header />
      {user && (
        <h1 className="mt-14 text-5xl font-light text-zinc-800">
          Olá, <span className="text-orange-400">{user?.name}</span>
        </h1>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={brand} onValueChange={(value) => setBrand(value)}>
          <SelectTrigger className="w-44 h-12 border-none">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Todos</SelectItem>
            <SelectItem value="Samsung">Samsung</SelectItem>
            <SelectItem value="Motorola">Motorola</SelectItem>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Huawei">Huawei</SelectItem>
            <SelectItem value="Xiaomi">Xiaomi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full mt-16">
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="h-16 w-16 border-[6px]" />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
            {getfilteredPhones().map((phone) => (
              <PhoneCard key={phone.id} {...phone} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
