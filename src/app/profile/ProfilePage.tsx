import { FormEvent, useContext, useState } from "react";
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
import { useUser, UserType } from "@/shared/context/user";
import useUploadImage from "@/shared/hooks/useUploadImage";
import { logoutUser, AUTH_ACTIONS, useAuth } from "@/shared/context/auth";
import config from "@/config/config";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [authState, authDispatch] = useAuth();
  const { upload, remove, loading } = useUploadImage();

  const onUploadImage = async (e: any) => {
    const file = e.target.files[0];
    const url = await upload(file, `profile_images/${user.username}`);
    await fetch(config.api.user.updateProfileImage(), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileImage: url }),
    });
    setUser((prevState: UserType) => ({
      ...prevState,
      profileImage: url,
    }));
  };
  const onRemoveProfileImage = async () => {
    await remove(`profile_images/${user.username}`);
    await fetch(config.api.user.updateProfileImage(), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileImage: "" }),
    });
    setUser((prevState: UserType) => ({
      ...prevState,
      profileImage: "",
    }));
  };
  const onDeleteAccount = async (e) => {
    await fetch(config.api.user.delete(user._id), {
      method: "POST",
      credentials: "include",
    });
    logoutUser(authDispatch, AUTH_ACTIONS);
  };
  return (
    <section className="flex flex-col container">
      <div className="flex items-start justify-between">
        <UserProfile
          user={user}
          isUploading={loading}
          onUploadImage={onUploadImage}
          onRemoveImage={onRemoveProfileImage}
        />
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
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
        <Badge>Badge 3</Badge>
      </div>
    </section>
  );
}