import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Pesquise por celulares"
        className="bg-white py-3 w-[35rem] rounded-lg pl-14 pr-2 text-zinc-800 outline-orange-300"
        {...props}
      />
      <MagnifyingGlass
        className="w-6 h-6 text-orange-400 absolute top-1/2 -translate-y-1/2 left-4"
        weight="bold"
      />
    </div>
  );
}
