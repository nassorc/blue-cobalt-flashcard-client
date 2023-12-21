import { AuthProvider } from "@/lib/context/auth";
import { DeckProvider } from "@/lib/context/deck";
import { ReviewSettingProvider } from "@/lib/context/ReviewSettingContext";
import { UserProvider } from "@/lib/context/user";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      {/* <AuthProvider>
        <UserProvider>
          <DeckProvider>
            <ReviewSettingProvider> */}
      {children}
      {/* </ReviewSettingProvider>
          </DeckProvider>
        </UserProvider>
      </AuthProvider> */}
    </BrowserRouter>
  );
}
