import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Point } from "../model/types"
import { X } from "lucide-react"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CalculatorSidebar() {

  const [points, setPoints] = useState<Point[]>([{ x: '', y: ''}])
  const [x, setX] = useState("")

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

  const handleSubmit = () => {
  }

  return (
    <SidebarProvider>
      <form onSubmit={handleSubmit}>
        <Sidebar className="w-80">
          <SidebarHeader className="border-b border-border px-4 py-2">
            <h2 className="text-lg font-semibold">Interpolasi</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-row items-center">
                <label htmlFor="x" className="text-left w-4/5">Metode interpolasi: </label>
                <Select>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Pilih metode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Metode</SelectLabel>
                      <SelectItem value="newton">Newton</SelectItem>
                      <SelectItem value="lagrange">Lagrange</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row items-center">
                <label htmlFor="x" className="text-left w-4/5">Nilai yang ingin diinterpolasi:</label>
                <Input
                  value={x}
                  onChange={(e) => {setX(e.target.value)}}
                  placeholder="x"
                  className="w-1/5 text-left"
                  type="number"
                  aria-label={`input x`}
                />
              </div>
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex flex-grow items-center gap-2">
                    <Input
                      value={point.x}
                      onChange={(e) => handlePointChanges(index, 'x', e.target.value)}
                      placeholder={ `x_${index}` }
                      className="w-2/5"
                      type="number"
                      aria-label={`X coordinate for point ${index + 1}`}
                    />
                    <Input
                      value={point.y}
                      onChange={(e) => handlePointChanges(index, 'y', e.target.value)}
                      placeholder={ `y_${index}` }
                      className="w-2/5"
                      type="number"
                      aria-label={`Y coordinate for point ${index + 1}`}
                    />
                  {index !== points.length - 1 && (
                    <Button
                      className={ "w-1/5" + (index !== points.length-1 ? "invisible" : "visible") }
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemovePoint(index)}
                      aria-label={`Remove point ${index + 1}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  </div>
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
      </form>
    </SidebarProvider>
  )
}
