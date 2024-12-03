import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { greettingService } from "./core/common/services/common.services"
export default function App() {
  const [greet, setGreet] = useState('This is a demo dashboard.')

  useEffect(()=>{
    const greeting = async () => {
      const data = await greettingService()
      if(!data) return
      setGreet(data)
    }

    greeting()
  },[])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Minimalist Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard 1</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Profile</a></li>
              <li><a href="#" className="hover:text-gray-300">Settings</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-10 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome to Dashboard</h2>
          <p className="text-gray-400">{greet}</p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-md mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  )
}
