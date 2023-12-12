import { 
  ReactNode, 
  useEffect, 
  forwardRef, 
  useState
} from "react";
import { cn } from "@/lib/utils";

interface PropType extends React.HTMLAttributes<HTMLDivElement>{
  profileImage: string
  size: "sm" | "md" | "lg" | "xl" | "profile",
  rounded?: "sm" | "md" | "lg" | "full",
  children?: ReactNode
}
const ProfileImage = forwardRef(
  function ProfileImage(props: PropType, ref: React.ForwardedRef<HTMLDivElement>) {
    const { profileImage, size, rounded, className, children, ...divProps } = props;
    const [imageLoaded, setImageLoaded] = useState(false);
    const sizes = {
      "sm": 28,
      "md": 38,
      "lg": 48,
      "xl": 58,
      "profile": 128
    }

    return (
      <div {...divProps} className={className}>
        <div 
          ref={ref}
          className={cn(`bg-[slateblue] aspect-square overflow-hidden`, rounded ? `rounded-${rounded}` : "rounded-sm")}
          style={{
            width: sizes[size] + "px",
            height: sizes[size] + "px"
          }}
        >
          {profileImage &&
            <img 
              className="block w-full h-full object-cover"
              src={profileImage} 
              alt=""
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          }
        </div>

        {children}
      </div>
    )
  }
)
export default ProfileImage