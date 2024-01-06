import React, { FormEvent, useContext, useState } from "react";
import { Icons } from "@/components/Icons";
// import PageShell from "@/components/PageShell";
import UserProfile from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser, UserType } from "@/lib/context/user";
import { logoutUser, AUTH_ACTIONS, useAuth } from "@/lib/context/auth";
import config from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { userAtom } from "@/lib/store/user";
import { useAtom } from "jotai";

export default function ProfilePage() {
  const [user] = useAtom(userAtom);
  console.log(user);

  const onDeleteAccount = async (e: React.MouseEvent) => {
    // await fetch(config.api.user.delete(user?._id), {
    //   method: "POST",
    //   credentials: "include",
    // });
    // logoutUser(authDispatch, AUTH_ACTIONS);
  };

  return (
    <section className="flex flex-col container">
      <div className="flex items-start justify-between">
        {
          // <UserProfile
          //   user={user}
          //   isUploading={loading}
          //   onUploadImage={onUploadImage}
          //   onRemoveImage={onRemoveProfileImage}
          // />
        }
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <Icons.settings />
              Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger
                  className="flex justify-center items-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Icons.trash />
                  <span>Delete Account</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanelty delete your accout.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteAccount}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <div>badge 1</div>
      </div>
    </section>
  );
}
