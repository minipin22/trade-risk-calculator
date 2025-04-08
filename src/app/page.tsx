"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const instruments: Record<string, number> = {
  MicroES: 5,
  ES: 50,
  MicroNQ: 2,
  NQ: 20,
  MicroYM: 0.5,
  YM: 5,
  CL: 10,
  GC: 100,
};

export default function Home() {
  const [risk, setRisk] = useState<number>(200);
  const [stopLoss, setStopLoss] = useState<number>(10);
  const [instrument, setInstrument] = useState<keyof typeof instruments>("MicroES");
  const [isDark, setIsDark] = useState<boolean>(false);

  const pointValue = instruments[instrument];
  const contracts = Math.floor(risk / (stopLoss * pointValue));

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 p-4">
        <Card className="w-full max-w-md space-y-4 p-6 rounded-2xl shadow-xl bg-white dark:bg-zinc-800">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Trade Risk Calculator
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Dark</span>
              <Switch checked={isDark} onCheckedChange={setIsDark} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300">Risk Per Trade ($)</Label>
            <Input
              type="number"
              value={risk}
              onChange={(e) => setRisk(Number(e.target.value) || 0)}
              className="dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300">Stop Loss (Points)</Label>
            <Input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value) || 0)}
              className="dark:bg-zinc-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-700 dark:text-zinc-300">Instrument</Label>
            <Select value={instrument} onValueChange={(val: string) => setInstrument(val as keyof typeof instruments)}>
              <SelectTrigger className="dark:bg-zinc-700 dark:text-white">{instrument}</SelectTrigger>
              <SelectContent className="dark:bg-zinc-700 dark:text-white">
                {Object.keys(instruments).map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-xl text-center font-semibold text-zinc-900 dark:text-white">
            Max Contracts: {isNaN(contracts) || contracts < 0 ? 0 : contracts}
          </div>
        </Card>
      </div>
    </div>
  );
}