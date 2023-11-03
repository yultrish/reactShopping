import { useContext } from "react";
import { ContextAuth } from "./ContextAuth";

export const useAuth = () => {
  return useContext(ContextAuth);
};
