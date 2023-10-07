import { UserDTO } from "@dtos/UserDTO";
import { API } from "@services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)


  async function signIn(email: string, password: string) {
    try {
      const { data } = await API.post("/sessions", { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (err) {
      throw err
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true)
      setUser({} as UserDTO)
      storageUserRemove()
    } catch (err) {
      throw err
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      if (userLogged) setUser(userLogged)
    } catch (err) {
      throw err
    } finally {
      setIsLoadingUserData(false)
    }
  }

  useEffect(() => { loadUserData() }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoadingUserData }}>
      {children}
    </AuthContext.Provider>)
}