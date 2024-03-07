import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeToken } from "@/utils/verifyToken";
import { User, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeToken();
    navigate("/");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-12 h-12 border-[3px] border-orange-400 cursor-pointer">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-24">
          <DropdownMenuItem className="flex gap-2 items-center">
            <User className="w-4 h-4 text-zinc-700" weight="bold" />
            Minha conta
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 items-center"
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
