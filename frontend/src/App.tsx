import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CalculatorSidebar } from './components/ui/calculator-sidebar'
import './App.css'

function App() {

  return (
    <>
    <SidebarProvider>
      <CalculatorSidebar />
      <main>
      </main>
    </SidebarProvider>
    </>
  )
}

export default App
