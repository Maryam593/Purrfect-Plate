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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, breed }),
        }
      )

      const data = await res.json()

      // 100% Anime Prompt Logic
      const animeStyle = "masterpiece, 2D anime style art, studio ghibli aesthetic, cel shaded, vibrant colors, hand-drawn, no realism, no 3d, no photo";
      const dish = data.cat.food || "tasty cat treats";
      const finalPrompt = encodeURIComponent(`${animeStyle}, a bowl of ${dish} for a ${breed} cat`);
      
      const generatedImage = `https://image.pollinations.ai/prompt/${finalPrompt}?width=512&height=512&nologo=true&model=flux&seed=${Math.floor(Math.random() * 10000)}`;

      setFood({
        image: generatedImage,
        food: dish
      })

    } catch (err) {
      console.log("Error:", err)
      alert("Check if Render Backend is active!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 font-mono">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close}></div>

      <div className="relative w-full max-w-sm bg-[#c9db94] border-[6px] border-[#2e3a1f] p-6 text-[#2e3a1f] animate-drop pixel-box shadow-[8px_8px_0px_0px_rgba(46,58,31,1)]">
        <div className="h-3 bg-[#2e3a1f] mb-4"></div>
        <p className="text-center text-[16px] mb-6 font-bold uppercase italic">✨ Cat Menu ✨</p>

        <div className="flex flex-col gap-3 mb-6">
          <input 
            type="text" 
            placeholder="CAT NAME..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 bg-[#e8f0d1] border-4 border-[#2e3a1f] text-[12px] outline-none placeholder-[#2e3a1f]/40"
          />
          <input 
            type="text" 
            placeholder="BREED (e.g. BENG)..." 
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="p-3 bg-[#e8f0d1] border-4 border-[#2e3a1f] text-[12px] outline-none placeholder-[#2e3a1f]/40"
          />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-[#2e3a1f] text-[#c9db94] py-3 font-bold hover:brightness-125 transition-all disabled:opacity-50 text-[14px] mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" 
          onClick={generateFood}
        >
          {loading ? "COOKING..." : "GENERATE FOOD "}
        </button>
        
        <p className="text-center cursor-pointer text-[10px] font-bold hover:underline" onClick={close}>[ CLOSE ]</p>

        {food && (
          <div className="mt-6 flex flex-col items-center gap-3 border-t-4 border-dashed border-[#2e3a1f] pt-6 animate-in zoom-in">
            <div className="relative p-1 bg-[#2e3a1f] rounded-lg">
              <img
                src={food.image}
                alt="Anime Food"
                referrerPolicy="no-referrer"
                className="w-48 h-48 object-cover rounded border-2 border-[#c9db94]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  // Giphy ka yeh link Access Denied nahi deta
                  target.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I0eHhndXp6ZnZ4eHhndXp6ZnZ4eHhndXp6ZnZ4eHhndXp6ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vS3pYI2H8XN56/giphy.gif";
                }}
              />
            </div>
            <div className="bg-[#2e3a1f] text-[#c9db94] px-4 py-1 rounded-full text-[12px] font-bold shadow-md">
               {food.food}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionDropDown