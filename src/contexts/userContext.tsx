import { createContext } from "react";

import { IUser } from "@/interface";



export const UserContext = createContext<IUser>({user:null, username:null});