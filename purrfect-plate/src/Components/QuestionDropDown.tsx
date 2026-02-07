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

    setLoading(true);
    setFood(null);

    try {
      const res = await fetch(
        "https://purrfect-plate-backend-1.onrender.com/api/catData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, breed, image: "" }),
        }
      );

      if (!res.ok) {
        throw new Error("Server response was not ok");
      }

      const data = await res.json();

      // Stable Anime Image Logic
      const visualPrompt = data.cat.visual_prompt || `Studio Ghibli style anime art, delicious cat food bowl for a ${breed} cat, vibrant colors`;
      const encodedPrompt = encodeURIComponent(visualPrompt);
      
      // 'flux' model use kiya hai jo 502 errors kam deta hai aur seed random rakha hai
      const generatedImage = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux&seed=${Math.floor(Math.random() * 99999)}`;

      setFood({
        image: generatedImage,
        food: data.cat.food
      });

    } catch (err) {
      console.log("API error:", err);
      alert("Backend is sleeping or API key leaked. Wake it up first!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close}></div>

      <div className="relative w-full max-w-sm bg-[#c9db94] border-[6px] border-[#2e3a1f] p-6 text-[#2e3a1f] animate-drop pixel-box shadow-[8px_8px_0px_0px_rgba(46,58,31,1)]">
        <div className="h-3 bg-[#2e3a1f] mb-4"></div>
        <p className="text-center text-[16px] mb-4 font-bold tracking-widest uppercase">Cat Menu</p>

        <div className="flex flex-col gap-3 mb-6">
          <input 
            type="text" 
            placeholder="Cat Name..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 bg-[#e8f0d1] border-4 border-[#2e3a1f] text-[14px] outline-none placeholder-[#2e3a1f]/40 font-mono"
          />
          <input 
            type="text" 
            placeholder="Breed (e.g. Bengal)" 
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="p-3 bg-[#e8f0d1] border-4 border-[#2e3a1f] text-[14px] outline-none placeholder-[#2e3a1f]/40 font-mono"
          />
        </div>

        <ul className="space-y-4 text-center">
          <button 
            disabled={loading}
            className="w-full cursor-pointer bg-[#2e3a1f] text-[#c9db94] py-3 font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 text-[14px]" 
            onClick={generateFood}
          >
            {loading ? "COOKING..." : "GENERATE FOOD ✨"}
          </button>
          
          <li className="cursor-pointer text-[12px] underline decoration-2 underline-offset-4 font-bold" onClick={close}>
            EXIT
          </li>
        </ul>

        {food && (
          <div className="mt-6 flex flex-col items-center gap-3 border-t-4 border-dashed border-[#2e3a1f] pt-6 animate-in zoom-in duration-300">
            <div className="relative p-1 bg-[#2e3a1f] rounded-xl shadow-lg">
              <img
                src={food.image}
                alt="AI Anime Cat Food"
                className="w-48 h-48 object-cover rounded-lg border-2 border-[#c9db94]"
                // Fallback image logic agar 502 error aaye
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://i.pinimg.com/originals/82/30/11/823011a0f83691375d3368222955f756.gif";
                }}
              />
            </div>
            <div className="text-center">
               <p className="text-[10px] uppercase tracking-tighter opacity-70">Chef's Special Recommendation</p>
               <p className="text-[15px] font-black leading-tight italic">
                  "{food.food}"
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionDropDown