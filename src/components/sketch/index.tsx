import { useRef, useState } from "react";
import MockReplicate from "@/lib/replicate";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const replicate = new MockReplicate("auth");

function Sketch() {
  const sketchRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [prevPoint, setPrevPoint] = useState<number[] | null>(null);
  const [replicated, setReplicated] = useState<string | null>(null);
  return (
    <>
      <div className="mx-auto max-w-[800px] flex justify-center">
        <div className="">
          <div className="flex">
            <Input placeholder="describe image" />
            <Button
              onClick={() => {
                if (!sketchRef.current) return;
                // console.log(sketchRef.current.toDataURL())
                const { output } = replicate.run("model1", {
                  image: "image",
                });
                setReplicated(output);
              }}
            >
              replicate
            </Button>
            <Button>draw</Button>
          </div>
          <div className="bg-white">
            <canvas
              className="aspect-squar"
              ref={sketchRef}
              onMouseMove={(e: any) => {
                // @ts-ignore
                if (e.target.tagName === "CANVAS" && drawing) {
                  const rect = e.target.getBoundingClientRect();
                  const ctx: CanvasRenderingContext2D =
                    e.target.getContext("2d");

                  let x = e.clientX - rect.left;
                  let y = e.clientY - rect.top;
                  ctx.beginPath();
                  if (prevPoint === null) {
                    setPrevPoint([x, y]);
                    return;
                  }
                  ctx.moveTo(prevPoint[0], prevPoint[1]);
                  ctx.lineTo(x, y);
                  ctx.fill();
                  ctx.stroke();

                  setPrevPoint([x, y]);

                  // ctx.fillStyle = "black"
                  // ctx.fillRect(x, y, 10, 10);
                }
              }}
              onMouseDown={(e) => {
                setDrawing(true);
              }}
              onMouseUp={(e) => {
                setDrawing(false);
                setPrevPoint(null);
              }}
              onMouseLeave={(e) => {
                setDrawing(false);
              }}
              width="400px"
              height="400px"
            ></canvas>
          </div>
        </div>
      </div>
      <div className="w-1/2 aspect-square">
        {replicated && (
          <img
            className="w-full min-h-full block object-cover"
            src={replicated}
          />
        )}
      </div>
    </>
  );
}
