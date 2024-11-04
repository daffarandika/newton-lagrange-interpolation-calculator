import { X, Plus } from "lucide-react"
import { Point } from "../model/types"
import { useState } from "react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar'

export function CalculatorSidebar() {

  const [points, setPoints] = useState<Point[]>([{ x: '', y: ''}])

  const handlePointChanges = (index: number, axis: 'x'|'y', value: string) => {
    const newPoints = [...points];
    newPoints[index][axis] = value;
    setPoints(newPoints);

    if (index == points.length - 1 && newPoints[index].x && newPoints[index].y) {
      setPoints([...newPoints, { x: '', y: '' }])
    }
  }

  const handleRemovePoint = (index: number) => {
    const newPoints = points.filter((_, i) => i != index);
    setPoints(newPoints.length ? newPoints : [{ x: '', y: ''}])
  }

  return (
    <SidebarProvider>
      <Sidebar className="w-60">
        <SidebarHeader className="border-b border-border px-4 py-2">
          <h2 className="text-lg font-semibold">Interpolasi</h2>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-2 p-4">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex flex-grow items-center gap-2">
                  <Input
                    value={point.x}
                    onChange={(e) => handlePointChanges(index, 'x', e.target.value)}
                    placeholder="x"
                    className="w-20"
                    type="number"
                    aria-label={`X coordinate for point ${index + 1}`}
                  />
                  <Input
                    value={point.y}
                    onChange={(e) => handlePointChanges(index, 'y', e.target.value)}
                    placeholder="y"
                    className="w-20"
                    type="number"
                    aria-label={`Y coordinate for point ${index + 1}`}
                  />
                </div>
                {index !== points.length - 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePoint(index)}
                    aria-label={`Remove point ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {}}
            >Hitung
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
