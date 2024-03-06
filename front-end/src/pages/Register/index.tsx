import Spinner from "@/components/Spinner";
import { fetchApi } from "@/utils/fetchApi";
import { addToken, isUserLogged } from "@/utils/verifyToken";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    const response = await fetchApi("/register", "POST", {
      email,
      password,
      name,
    });

    if (response && response.data) {
      toast("Cadastrado com sucesso!", {
        style: {
          background: "green",
          color: "white",
          border: "none",
        },
      });

      addToken(response.data);
      navigate("/home");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isUserLogged()) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#f5f5f5]">
      <div className="flex flex-col items-center gap-3 w-5/6">
        <h1 className="text-2xl font-medium sm:text-3xl m-0">Cadastro</h1>
        <p className="text-[#bdbdbd] text-lg sm:text-xl">
          Insira suas informações abaixo para se cadastrar
        </p>
      </div>
      <div className="mt-9 flex flex-col gap-5 w-4/5 sm:w-96">
        <label htmlFor="password-input" className="flex flex-col">
          <span className="text-lg sm:text-xl">Nome</span>
          <input
            className="w-full h-12 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg"
            id="name-input"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email-input" className="flex flex-col">
          <span className="text-lg sm:text-xl">Email</span>
          <input
            className="w-full sm:w-96 h-12 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg"
            id="email-input"
            type="text"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password-input" className="flex flex-col">
          <span className="text-lg sm:text-xl">Senha</span>
          <input
            className="w-full h-12 border-2
            outline-2 outline-[#a0a0a0] pl-4 rounded-lg"
            id="password-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div
        className="button_container flex flex-col
        mt-28 sm:mt-16 items-center w-4/5 sm:w-96"
      >
        <button
          className="bg-blue-400 w-full h-12 rounded-lg font-medium text-lg sm:text-xl
          hover:bg-blue-300 transition-colors text-white disabled:bg-blue-300"
          type="button"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="h-4 w-4 border-[2px] text-blue-500" />
          ) : (
            "Cadastrar"
          )}
        </button>
        <div className="mt-5 whitespace-nowrap">
          <span className="text-[#bdbdbd] text-base">
            Já possui uma conta ?{" "}
          </span>
          <button type="button" className="text-base">
            Login.
          </button>
        </div>
      </div>
    </div>
  );
}
