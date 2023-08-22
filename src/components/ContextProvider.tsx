import { AuthProvider } from "@/shared/context/auth"
import { AuthProvider as OldAuthProvider } from "@/shared/context/AuthContext"
import { ReviewSettingProvider } from "@/shared/context/ReviewSettingContext"
import { UserProvider } from "@/shared/context/user"
import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"
export default function ContextProvider({children}: {children: ReactNode}) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OldAuthProvider>
          <UserProvider>
            <ReviewSettingProvider>
              {children}
            </ReviewSettingProvider>
          </UserProvider>
        </OldAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
