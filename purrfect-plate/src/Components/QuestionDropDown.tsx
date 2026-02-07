"use client"

import { useState } from "react"

interface CatFood {
  image: string
  food: string
}

const QuestionDropDown = ({ open, close }: any) => {
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [food, setFood] = useState<CatFood | null>(null)
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const generateFood = async () => {
    if (!name || !breed) {
      alert("Please enter cat name and breed first!")
      return
    }

    setLoading(true)
    setFood(null)

    try {
      const res = await fetch(
        "https://purrfect-plate-backend-1.onrender.com/api/catData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            breed: breed,
            image: "" 
          }),
        }
      )

      if (!res.ok) {
        throw new Error("Server response was not ok")
      }

      const data = await res.json()

      setFood({
        // Yahan aap apni anime image ka link bhi daal sakti hain agar backend real photo bhej raha hai
        image: data.cat.image || "https://path-to-your-anime-food.png",
        food: data.cat.food
      })

    } catch (err) {
      console.log("API error:", err)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={close}></div>

      <div className="relative w-80 bg-[#c9db94] border-[6px] border-[#2e3a1f] p-6 text-[#2e3a1f] animate-drop pixel-box">
        <div className="h-3 bg-[#2e3a1f] mb-4"></div>
        <p className="text-center text-[14px] mb-4 font-bold">CAT MENU</p>

        {/* Input Fields */}
        <div className="flex flex-col gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Cat Name..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-transparent border-2 border-[#2e3a1f] text-[12px] outline-none placeholder-[#2e3a1f]/50"
          />
          <input 
            type="text" 
            placeholder="Breed (e.g. Bengal)" 
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="p-2 bg-transparent border-2 border-[#2e3a1f] text-[12px] outline-none placeholder-[#2e3a1f]/50"
          />
        </div>

        <ul className="space-y-4 text-center text-[12px]">
          <li className="cursor-pointer bg-[#2e3a1f] text-white py-2 hover:opacity-80 transition-all" onClick={generateFood}>
            {loading ? "COOKING..." : "GENERATE FOOD"}
          </li>
          <li className="cursor-pointer border-b border-[#2e3a1f] inline-block" onClick={close}>Close</li>
        </ul>

        {/* Food result */}
        {food && (
          <div className="food-spawn mt-6 flex flex-col items-center gap-2 border-t-2 border-dashed border-[#2e3a1f] pt-4 animate-in fade-in duration-500">
            <img
              src={food.image}
              alt="anime cat food"
              className="w-32 h-32 object-cover border-2 border-[#2e3a1f] rounded-lg shadow-sm"
            />
            <p className="text-[12px] text-center font-bold italic">
               "{food.food}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionDropDown