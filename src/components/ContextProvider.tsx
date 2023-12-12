import { AuthProvider } from "@/shared/context/auth";
import { AuthProvider as OldAuthProvider } from "@/shared/context/AuthContext";
import { DeckProvider } from "@/shared/context/deck";
import { ReviewSettingProvider } from "@/shared/context/ReviewSettingContext";
import { UserProvider } from "@/shared/context/user";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OldAuthProvider>
          <UserProvider>
            <DeckProvider>
              <ReviewSettingProvider>{children}</ReviewSettingProvider>
            </DeckProvider>
          </UserProvider>
        </OldAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
