"use client"
import React from "react";
import QuestionDropDown from "./QuestionDropDown";
const MeowButton = () => {
    const [isClicked, setIsClicked] = React.useState(false);
    const meowClick =() => {
        const audio = new Audio("cat-voice.mp3");
        if (!isClicked) {
            audio.play();
            setIsClicked(true);
        }
        else{
            audio.pause();
            audio.currentTime = 0;
            setIsClicked(false);
        }
        
    }
    return (
        <div className="flex justify-center items-center h-screen ">
            
            <button
                className="
                w-40 h-16
                bg-[#d4e79e]
                border-4 border-[#2e3a1f]
                text-[#2e3a1f] font-bold
                `active:translate-x-1` active:translate-y-1 flex items-center justify-center gap-4` 
                "
                style={{
                    boxShadow: "6px 6px 0px #1b2312"
                }}
                onClick={meowClick}
            >
                MEOW 
                <span><img src="paw.png" alt="Cat Icon"/></span>
            </button>
          
            </div>


        
    )
}

export default MeowButton
