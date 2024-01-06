import { FormEvent } from "react";
import { Icons } from "./Icons";
import ProfileImage from "./ProfileImage";
import { Button } from "./ui/button";

interface PropType {
  user: {
    _id: string;
    username: string;
    profileImage: string;
    email: string;
  };
  isUploading: boolean;
  onUploadImage: (e: FormEvent) => void;
  onRemoveImage: () => void;
}
export default function UserProfile(props: PropType) {
  const {
    user: { _id, username, profileImage },
    isUploading,
    onUploadImage,
    onRemoveImage,
  } = props;

  return (
    <div className="flex space-x-4">
      <div className="relative max-w-32 w-32 max-h-32 aspect-square overflow-hidden">
        {isUploading && (
          <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
            <div className="w-1/3 h-1/3 aspect-square border-8 border-white border-t-8 border-t-site-accent animate-spin rounded-full"></div>
          </div>
        )}
        {<ProfileImage profileImage={profileImage} size="profile" ref={null} />}

        {profileImage.length > 0 && (
          <Button
            className="absolute z-[99] top-0 right-0 w-7 h-7"
            size="icon"
            onClick={onRemoveImage}
          >
            <Icons.x className="w-5" />
          </Button>
        )}

        <div className="absolute w-full -bottom-1 z-[99]">
          <Button
            className="w-full h-[32px] bg-slate-900/90 cursor-pointer"
            asChild
          >
            <label htmlFor="profile-img">
              <Icons.camera />
              <p className="ml-1">change</p>
            </label>
          </Button>
          <input
            id="profile-img"
            type="file"
            name="profile-img"
            multiple={false}
            onChange={onUploadImage}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl">{username}</h1>
      </div>
    </div>
  );
}
