import { DialogPropsType } from "./types";

export default function DialogBackdrop({
  showDialog,
  setShowDialog,
}: DialogPropsType) {
  return (
    <div
      className="absolute z-[98] inset-0 bg-white/50 backdrop-blur-[4px] transition-all"
      onClick={() => setShowDialog(false)}
    ></div>
  );
}
