import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import Spinner from "./Spinner";

interface DeletePhoneAlertProps {
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFunction: () => void;
  isLoading: boolean;
}

export default function DeletePhoneAlert({
  isAlertOpen,
  setIsAlertOpen,
  deleteFunction,
  isLoading,
}: DeletePhoneAlertProps) {
  return (
    <AlertDialog open={isAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
          <AlertDialogDescription>
            A ação não pode ser desfeita. Seu produto será deletado
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (!isLoading) {
                setIsAlertOpen(false);
              }
            }}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className={`transition-colors ${
              isLoading
                ? "bg-red-200 hover:bg-red-200"
                : "bg-red-400 hover:bg-red-300"
            }`}
            onClick={deleteFunction}
          >
            {isLoading ? (
              <Spinner className="h-4 w-4 border-[2px] text-red-400" />
            ) : (
              <p className={isLoading ? "opacity-0" : "opacity-100"}>
                Continuar
              </p>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
