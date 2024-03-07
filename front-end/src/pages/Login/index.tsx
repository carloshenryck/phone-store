import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { fetchApi } from "@/utils/fetchApi";
import { addToken, isUserLogged } from "@/utils/verifyToken";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await fetchApi<string>("/login", "POST", {
      email,
      password,
    });
    setIsLoading(false);

    if (response?.data) {
      addToken(response.data);
      navigate("/home");
    }
  };

  useEffect(() => {
    if (isUserLogged()) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#f5f5f5]">
      <div className="flex flex-col items-center gap-3 w-5/6">
        <h1 className="text-2xl font-medium sm:text-3xl m-0">Login</h1>
        <p className="text-[#bdbdbd] text-lg sm:text-xl">
          Insira suas inforações abaixo para realizar login
        </p>
      </div>
      <div className="mt-9 flex flex-col gap-5 w-4/5 sm:w-96">
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
      <div className="button_container flex flex-col mt-28 sm:mt-16 items-center w-4/5 sm:w-96">
        <button
          className="bg-orange-400 w-full h-12 rounded-lg font-medium text-lg sm:text-xl hover:bg-orange-300 transition-colors text-white disabled:bg-orange-300"
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="h-4 w-4 border-[2px] text-orange-200" />
          ) : (
            "Entrar"
          )}
        </button>
        <div className="mt-5 whitespace-nowrap">
          <span className="text-[#bdbdbd] text-base">Não tem uma conta ? </span>
          <Link to={"/register"} className="text-base">
            Cadastre-se.
          </Link>
        </div>
      </div>
    </div>
  );
}
