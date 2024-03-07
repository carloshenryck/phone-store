import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/UserStore";
import { getNameInitials } from "@/utils/getNameInitials";
import { removeToken } from "@/utils/verifyToken";
import { HouseSimple, SignOut, User } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeToken();
    navigate("/");
    setUser(null);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-12 h-12 border-[3px] border-orange-400 cursor-pointer">
            {user?.name && (
              <AvatarFallback>{getNameInitials(user?.name)}</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-28">
          <DropdownMenuItem
            className="flex gap-4 items-center"
            onClick={() => navigate("/home")}
          >
            <HouseSimple className="w-4 h-4 text-zinc-700" weight="bold" />
            Início
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-4 items-center"
            onClick={() => navigate("/user-phones")}
          >
            <User className="w-4 h-4 text-zinc-700" weight="bold" />
            Meus produtos
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-4 items-center"
            onClick={handleLogOut}
          >
            <SignOut className="w-4 h-4 text-red-500" weight="bold" />
            <p className="text-red-500">Sair</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
