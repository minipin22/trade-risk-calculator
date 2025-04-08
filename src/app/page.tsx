"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const instruments: Record<string, number> = {
  ES: 50,
  MicroES: 5,
  NQ: 20,
  MicroNQ: 2,
  YM: 5,
  MicroYM: 0.5,
  CL: 10,
  GC: 100,
};

export default function Home() {
  const [risk, setRisk] = useState<number>(200);
  const [stopLoss, setStopLoss] = useState<number>(10);
  const [instrument, setInstrument] = useState<keyof typeof instruments>("MicroES");

  const pointValue = instruments[instrument];
  const contracts = Math.floor(risk / (stopLoss * pointValue));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center">Trade Risk Calculator</h1>

        <div className="space-y-2">
          <Label>Risk Per Trade ($)</Label>
          <Input
            type="number"
            value={risk}
            onChange={(e) => setRisk(parseFloat(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Stop Loss (Points)</Label>
          <Input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(parseFloat(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Instrument</Label>
          <Select value={instrument} onValueChange={(val) => setInstrument(val as keyof typeof instruments)}>
            <SelectTrigger>{instrument}</SelectTrigger>
            <SelectContent>
              {Object.keys(instruments).map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xl text-center font-semibold">
          Max Contracts: {isNaN(contracts) || contracts < 0 ? 0 : contracts}
        </div>
      </Card>
    </div>
  );
}
