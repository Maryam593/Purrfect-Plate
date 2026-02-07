"use client"

const MeowButton = ({toggle}:any) => {

    return (
        <div className="flex justify-center items-center h-screen gap-6">
            
            <button
                className="
                w-40 h-16
                bg-[#d4e79e]
                border-4 border-[#2e3a1f]
                text-[#2e3a1f] font-bold
                `active:translate-x-1` active:translate-y-1 flex items-center justify-center gap-10` 
                "
                style={{
                    boxShadow: "6px 6px 0px #1b2312"
                }}
              onClick={toggle}
            >
                MEOW 
                <span className="ml-3"><img src="/paw.png" className="w-6 h-6" alt="Cat Icon"/></span>
            </button>
          
            </div>


        
    )
}

export default MeowButton
