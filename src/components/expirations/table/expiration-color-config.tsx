import { useState } from "react";
import { Palette } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExpirationColorConfigProps {
  redDays: number;
  yellowDays: number;
  onSave: (redDays: number, yellowDays: number) => void;
}

export function ExpirationColorConfig({
  redDays,
  yellowDays,
  onSave,
}: ExpirationColorConfigProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRedDays, setTempRedDays] = useState(redDays);
  const [tempYellowDays, setTempYellowDays] = useState(yellowDays);

  const isInvalid = tempRedDays >= tempYellowDays;

  function handleOpen() {
    setTempRedDays(redDays);
    setTempYellowDays(yellowDays);
    setIsOpen(true);
  }

  function handleSave() {
    onSave(tempRedDays, tempYellowDays);
    setIsOpen(false);
  }

  return (
    <>
      <Button
        className="flex items-center justify-center"
        variant="outline"
        onClick={handleOpen}
      >
        <Palette className="size-full" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-90">
          <DialogHeader>
            <DialogTitle>Dias de alerta</DialogTitle>
            <DialogDescription>Configure os dias do alerta.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex border rounded-lg py-2 px-4 justify-between items-center gap-3">
              <Label>
                <span className="w-4 h-4 rounded-full bg-red-400 shrink-0" />
                Vermelho
              </Label>
              <Input
                className={`w-12 text-center ${isInvalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                min={1}
                value={tempRedDays}
                onChange={(e) => setTempRedDays(Number(e.target.value))}
              />
            </div>
            <div className="flex border rounded-lg py-2 px-4 justify-between items-center gap-3">
              <Label>
                <span className="w-4 h-4 rounded-full bg-yellow-400 shrink-0" />
                Amarelo
              </Label>
              <Input
                className={`w-12 text-center ${isInvalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                min={1}
                value={tempYellowDays}
                onChange={(e) => setTempYellowDays(Number(e.target.value))}
              />
            </div>
            {isInvalid && (
              <p className="text-sm text-red-500">
                O vermelho deve ser menor que o amarelo.
              </p>
            )}
            <div className="flex border rounded-lg py-2 px-4 justify-between items-center gap-3">
              <Label>
                <span className="w-4 h-4 rounded-full bg-blue-400 shrink-0" />
                Azul
              </Label>
              <span>Acima de {tempYellowDays} dias.</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isInvalid}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
