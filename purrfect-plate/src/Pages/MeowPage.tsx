"use client"
import { useState, useRef, useEffect } from "react"
import MeowButton from "../Components/MeowButton"
import CurtainMenu from "../Components/QuestionDropDown"

export default function MeowPage(){

  const [open,setOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // preload
  useEffect(()=>{
    audioRef.current = new Audio("/cat-voice.mp3")
    audioRef.current.volume = 0.6
  },[])

  const toggleMenu = () => {

    // restart sound if spamming click
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    // wait for cat to finish talking
    setTimeout(()=>{
      setOpen(prev => !prev)
    },600) // adjust according to sound length
  }

  const closeMenu = () => {
    setOpen(false)
  }

  return(
    <div className="flex flex-col items-center h-screen pt-32 gap-6">

      <MeowButton toggle={toggleMenu}/>
      <CurtainMenu open={open} close={closeMenu}/>

    </div>
  )
}
