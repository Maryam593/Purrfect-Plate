"use client"

import { useState } from "react"

interface Food {
  image: string
  [key: string]: any
}

const QuestionDropDown = ({open, close}:any) => {

  const [food,setFood] = useState<Food | null>(null)
  const [loading,setLoading] = useState(false)

  if(!open) return null

  const generateFood = async () => {

    setLoading(true)
    setFood(null)

    try{
      const res = await fetch(
  "https://purrfect-plate-backend-1.onrender.com/generate-food",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  }
);

const data = await res.json();


      setFood(data)
    }catch(err){
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={close}
      ></div>

      {/* modal */}
      <div className="
        relative
        w-80
        bg-[#c9db94]
        border-[6px] border-[#2e3a1f]
        p-6
        text-[#2e3a1f]
        animate-drop
        pixel-box
      ">

        {/* curtain rod */}
        <div className="h-3 bg-[#2e3a1f] mb-4"></div>

        <p className="text-center text-[14px] mb-6">CAT MENU</p>

        <ul className="space-y-4 text-center text-[12px]">

          <li 
            className="cursor-pointer hover:scale-110"
            onClick={generateFood}
          >
            Generate Food
          </li>

          <li className="cursor-pointer">Pet Cat</li>

          <li className="cursor-pointer" onClick={close}>
            Close
          </li>

        </ul>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-6 animate-pulse">
            Cooking...
          </p>
        )}

        {/* Food result */}
        {food && (
          <div className="food-spawn mt-6 flex justify-center">
            <img 
              src={food.image} 
              alt="food"
              className="w-32 h-32 pixel-art"
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default QuestionDropDown
