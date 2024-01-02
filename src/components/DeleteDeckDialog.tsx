import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

export default function DeleteDeckDialog({
  children,
  deckName,
}: {
  children: ReactNode;
  deckName: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this deck?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="text-black font-semibold">{deckName}</span>? You
            cannot undo this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive">Delete deck</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
