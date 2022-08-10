import { useEffect } from "react";
import toast from "react-hot-toast";

export function useToastErrors(errors: any) {
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      for (let errorType in errors) {
        toast.error(errors[errorType]);
      }
    }
  }, [errors]);
}
