import { useEffect } from "react";
import "../Modules/themes"
import { useNavigate } from "react-router-dom";

const ThankYou = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        const gameOver = localStorage.getItem("gameover");
        if(gameOver === "false")
            {
                navigate('/codespace');
            }
    },[navigate])
    return(
        <div className="flex flex-col items-center  justify-center min-h-screen p-4 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="backdrop-blur-md bg-white/20  p-6 rounded-lg shadow-lg shadow-black relative  w-[42rem]">
          <h2 className="text-2xl font-semibold mb-4 font-Orbiton">Special Thanks To!</h2>
          <p className="mb-4 text-justify text-xl font-Roboto">We would like to extend our heartfelt gratitude to our Head of Department, <b>Dr.R.Vengateshkumar,MCA.,M.Phil.,Ph.D.</b> for their unwavering support and approval of this event.</p>
          <p className="mb-4 text-justify text-xl font-Roboto">A special thank you to <b>Mr.S.Alagukumar,MCA.,M.Phil.,</b> and <b>Mrs.T.Krishnaveni,M.sc.,M.Phil.,</b> for their continuous guidance throughout the process.</p>
          <p className="mb-4 text-justify text-xl font-Roboto">We also deeply appreciate the contributions of <b>all faculty members</b> and the <b>student volunteers</b> who worked tirelessly to ensure everything ran smoothly.</p>
          <p className="mb-4 text-justify text-xl font-Roboto">Lastly, we are incredibly thankful to you, <b>the participants</b>, for your enthusiasm and hard work. Your energy and passion have made this event truly memorable.</p>
        </div>
      </div>
    )
}

export default ThankYou;