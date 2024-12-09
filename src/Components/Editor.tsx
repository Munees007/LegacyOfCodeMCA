import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";
import React, { useEffect,useState } from "react";
import DropDown from "./DropDown";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'
import { VscCheck,VscPlay, } from "react-icons/vsc";
import { VscSave } from "react-icons/vsc";
import Lottie from "lottie-react";
import loading from '../assets/animations/loading.json';
import empty from '../assets/animations/codeStart.json';
import error1 from "../assets/animations/error1.json";
import { ResultType } from "./Compiler";
import { FaTrash } from "react-icons/fa";
import timerAni from "../assets/animations/timer1.json";
import { useNavigate } from "react-router-dom";
import { answerType, Level } from "../types/QuestionType";
import { addCodeData } from "../Database/functions/addData";

export const getCurrentLevelIndex = () =>{
  const temp:number = parseInt(localStorage.getItem("LevelIndicator")!) || 0
    return temp
}
interface EditorProps {
  ExecuteCode: (code: string, language: string, file: string) => void;
  Result: ResultType | null;
  questionNo:number;
  clearOutput:() => void;
  currentLevel:Level,
  increaseLevel: () => void,
  useLevel:boolean,
  levelIndex:number
}
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
const codeDataToDB = async ()=>{
  const data = localStorage.getItem("codeData");

  if(data)
  {
    await addCodeData(JSON.parse(data))
  }
}
const Editor: React.FC<EditorProps> = ({useLevel,levelIndex, ExecuteCode, Result,questionNo,clearOutput,currentLevel ,increaseLevel}) => {

  const [code, setCode] = useState<string>(()=>{
    if(useLevel)
    {
      return localStorage.getItem("Level" + levelIndex +questionNo.toString()) || ""
    }
    else{
      return localStorage.getItem("Level" + getCurrentLevelIndex() +questionNo.toString()) || "";
    }
  });
  const navigate = useNavigate();
  const [timerRunning,setTimerRunning] = useState<boolean>(true);
  const [gameOver,setGameOver] = useState<boolean>(()=>{
    const temp:boolean = Boolean(localStorage.getItem("gameover")) || false
    return temp;
  });
  const [codeData,setCodeData] = useState<answerType | null>(()=>{
    const temp = localStorage.getItem("codeData");
    if(temp)
    {
      return JSON.parse(temp);
    }
    else{
      return null
    }
  });
  useEffect(()=>{
      const temp = localStorage.getItem("gameover") || "false";
      const timer = localStorage.getItem("timer") || "60";
      if(temp !== "false" || timer === "0")
      {
        navigate('/thankYou')
      }
  },[navigate])
  const [levelIncrease,setLevelIncrease] = useState<boolean>(false);
  const [timer,setTimer] = useState<number>(()=>{
    const temp = localStorage.getItem("timer")
    if(temp){
      return parseInt(temp)
    } 
    else{
      localStorage.setItem("timer",(60*60).toString());
      return 60*60; // time in seconds 
    }
  })
  const [currentLevelIndex,setCurrentLevelIndex] = useState<number>(()=>{
    const temp:number = parseInt(localStorage.getItem("LevelIndicator")!) || 0
    return temp
  })
  //const [canSubmit,setCanSubmit] = useState<boolean>(false);
  const [theme, SetTheme] = useState<string>(()=>{
    return localStorage.getItem("theme") || "dracula";
  });
  const [language, SetLanguage] = useState<string>(()=>{
    return localStorage.getItem("Level" + getCurrentLevelIndex() + "Question"+questionNo.toString() +"language") || "java";
  });
  const runCode = () => {
    if (code !== "") {
      ExecuteCode(code, language, "main." + language);
    } else {
      toast.error("Type something");
    }
  };
  const [breakTime,setBreakTime] = useState<number>(()=>{
      const temp = localStorage.getItem("breakTime")
      console.log(temp)
      if(temp){
        return parseInt(temp)
      }
      else{
        localStorage.setItem("breakTime",(60*0).toString());
        return 60*0
      }
  })
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };
  
  const formatBreakTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };
  const [breakTimer,setBreakTimer] = useState<boolean>(()=>{
    const temp = localStorage.getItem("breakTimer")
    if(temp==="true"){
      return true
    }
    else{
      localStorage.setItem("breakTimer","false")
      return false
    }
  })
  useEffect(()=>{
    if(!breakTimer) return 
    let handleBreakTimer:NodeJS.Timeout;
          handleBreakTimer = setInterval(()=>{
            setBreakTime((preValue)=> preValue-1)
            localStorage.setItem("breakTime",breakTime.toString())
          },1000)
      if(breakTime<=0)
      {
        localStorage.setItem("breakTime","0")
        localStorage.setItem("breakTimer","false");
        setTimer(timer-2);
        localStorage.setItem("timer",(timer-2).toString())
        setTimerRunning(true);
        setBreakTimer(false);
      }
    

      return ()=> clearInterval(handleBreakTimer)
  },[breakTimer,breakTime])
  const handleDatasubmit = async ()=>{
    console.log(getCurrentLevelIndex())
    await increaseLevel()
    const temp = parseInt(localStorage.getItem("MaxLength")!);
    if(getCurrentLevelIndex()<temp)
    {
      setCurrentLevelIndex(getCurrentLevelIndex());
    }
    setLevelIncrease(false);
    setCode("");
  }
  useEffect(()=>{
    if(!timerRunning) return
    if(!timerRunning && gameOver) return
      const handleTimer = setInterval(()=>{
          setTimer((preValue)=> preValue -1);
          localStorage.setItem("timer",timer.toString())
          
      },1000)
      
      if(timer ===0)
      {
        codeDataToDB()
        setTimer(0);
        setTimerRunning(false);
        setGameOver(true);
        localStorage.setItem("timer","0");
        localStorage.setItem("gameover","true");
        navigate('/thankYou')
      }
      
      if(timer === 5400)
      {
        localStorage.setItem("breakTimer","true");
        setTimerRunning(false);
        setBreakTimer(true);
      }
      
      if(currentLevel?.questions?.length === getScore())
      {
          console.log("IncreasedLevel")
          setLevelIncrease(true);
      }
      return() =>clearInterval(handleTimer)
  },[timer,timerRunning,gameOver,currentLevelIndex])

  const getScore = ():number =>{
      const currentLevel = parseInt(localStorage.getItem("LevelIndicator")!) || 0;
      if (codeData && codeData.finalAnswer && codeData.finalAnswer[currentLevel]) {
        return codeData.finalAnswer[currentLevel].score || 0;
      }
    
      return 0; // Return 0 if any of the checks fail
    };

  useEffect(()=>{
      const gameover = localStorage.getItem("gameover");

      if(gameover === "true")
        {
          navigate('/thankYou')
        }
  },[gameOver])
  const themes = [
    { label: "Twilight", value: "twilight" },
    { label: "Clouds", value: "clouds" },
    { label: "Dawn", value: "dawn" },
    { label: "Dracula", value: "dracula" },
    { label: "Ambiance", value: "ambiance" },
    { label: "DreamWeaver", value: "dreamweaver" },
    { label: "Chaos", value: "chaos" },
    { label: "Cobalt", value: "cobalt" },
    { label: "Eclipse", value: "eclipse" },
    { label: "GruvBox", value: "gruvbox" },
    { label: "Gob", value: "gob" },
    { label: "Monokai", value: "monokai" },
  ];
  const languages = [
    { label: "C++", value: "cpp" },
    { label: "Python", value: "python" },
  ];

  const handleTheme = (value: string) => {
    SetTheme(value);
    localStorage.setItem('theme',value);
  };
  const handleLanguage = (value: string) => {
    SetLanguage(value);
  };
  const getQuestionsFromLocalStorage = (numberOfQuestions: number,levelNo:number): answerType => {
    let questions: answerType = JSON.parse(localStorage.getItem("codeData")!) || {finalAnswer:[]};
    
    if (!questions.finalAnswer[levelNo]) {
      questions.finalAnswer[levelNo] = { answer: [] };
    }
    for (let i = 1; i <= numberOfQuestions; i++) {
      const keyPrefix = `${i}`;
      
      questions.finalAnswer[levelNo].answer[i-1] = {
        code: localStorage.getItem("Level" + getCurrentLevelIndex() + keyPrefix) || "",
        language: localStorage.getItem("Level" + getCurrentLevelIndex() + "Question" +`${keyPrefix}language`) || "java",
        output: localStorage.getItem("Level" + getCurrentLevelIndex() +"Question"+`${keyPrefix}output`) || "",
        answered:Boolean(localStorage.getItem("Level" + getCurrentLevelIndex() +"question" + i + "answered")) || false
      };
      
    }
    let score = 0;
      for(let i=0;i<questions.finalAnswer[levelNo].answer.length;i++)
      {
        if(questions.finalAnswer[levelNo].answer[i].answered)
        {
          score++;
        }
      }
      questions.finalAnswer[levelNo].score = score;
      questions.timeLeft = timer;
      setCodeData(questions);
      localStorage.setItem("codeData",JSON.stringify(questions));
      console.log(questions);
    return questions;
  };
  const handleSubmit = () =>{
    if (!Result) return toast.error("Run the Code First")
      if(Result?.success){
        const correctAnswer = currentLevel.questions[questionNo-1].content.answer;
        console.log(correctAnswer)
        console.log(Result.output)
        if(Result.output === correctAnswer)
        {
          save();
          localStorage.setItem("Level" + getCurrentLevelIndex() +"question" + questionNo + "answered","true");
          const data:any = getQuestionsFromLocalStorage(currentLevel.questions.length,getCurrentLevelIndex())
          console.log(data)
          codeDataToDB();
          toast.success("Correct answer");
        }
        else{
          localStorage.setItem("Level" + getCurrentLevelIndex() +"question" + questionNo + "answered","false");
          toast.error("Wrong Answer");
        }
      }
      else
      {
        toast.warning("Please correct the errors before submitting")
      }
  };

  useEffect(()=>{
    const temp = localStorage.getItem("Level" + getCurrentLevelIndex() +"Question"+questionNo.toString() +"language") || "java";
    clearOutput();
    SetLanguage(temp);
  },[questionNo])
  useEffect(()=>{
      localStorage.setItem("Level" + getCurrentLevelIndex() +"Question"+questionNo+"output",Result?.output!);
  },[Result])
  const save = ()=>{
    if(code === "") {toast.error("Please Type Program Before Saving"); return} 
    localStorage.setItem("Level" + getCurrentLevelIndex() +questionNo.toString(),code);
    localStorage.setItem("Level" + getCurrentLevelIndex() +"Question"+questionNo.toString() +"language",language);
    toast.success("Saved Successfully");
  }
  const handleSave = ()=>{
    save();
  }
  useEffect(()=>{
    
    let storedCode;
    if(useLevel)
      {
        storedCode =  localStorage.getItem("Level" + levelIndex +questionNo.toString()) || ""
      }
      else{
        storedCode =  localStorage.getItem("Level" + getCurrentLevelIndex() +questionNo.toString()) || "";
      }
    console.log(storedCode)
    setCode(storedCode);
  },[questionNo,useLevel])
  // const messages = [
  //   "Well done! You've successfully conquered another coding question!",
  //   "Nice work! One more coding puzzle down, keep the momentum going!",
  //   "Fantastic! You've completed another step towards victory!",
  //   "You're on fire! Another coding challenge solved, just a few more to go!"
  // ];
  // const generateRandom = (val:number):number =>{
  //   const temp = Math.floor(Math.random() * val);
  //   return temp;
  // }  
  const changeNextBtn = ():boolean =>{
    const maxLength = localStorage.getItem("MaxLength");
    if(maxLength)
    {
        const length = parseInt(maxLength);
        if(currentLevel.levelIndex===length-1)
        {
          return true
        }
        else{
          return false
        }
    }
    else{
      return false
    }

  }
  if(breakTimer)
    {
      return <div className="w-full fixed bgBreakTimer text-black flex flex-col justify-center items-center h-screen">
          <p className="text-center font-semibold p-2 absolute top-[27rem] text-2xl text-white bg-black/70 rounded-lg">Halfway through, it's time to rest,  
          <br/>15 minutes to recharge and do your best!</p>
          <div 
        className="absolute top-36 flex flex-col bgBreakTimerC h-72 w-72 items-center justify-center">
            <p className="text-4xl  mt-8 mr-4 text-cyan-300 uppercase font-bold font-Orbiton">{formatBreakTime(breakTime)}</p>
          </div>
      </div>
    }
  return (
    <div className={`ace-${theme ? theme : "dracula"} ${useLevel ? "pointer-events-none" :""} ${codeData?.finalAnswer[currentLevelIndex]?.answer[questionNo-1]?.answered ? "pointer-events-none" : ""} relative h-screen p-5 overflow-hidden`}>
      <button onClick={()=>{console.log()}}>click</button>
      <p className="text-4xl font-bold text-center">CODING CONTEST</p>
      {
        codeData?.finalAnswer[currentLevelIndex]?.answer[questionNo-1]?.answered && <p className="text-xl text-green-500 uppercase font-bold absolute top-5 right-10">completed</p>
      }
      {
        levelIncrease && 
          <button className="absolute bottom-10 bg-green-600 px-2 font-bold border-2 hover:bg-green-800 w-fit h-10 rounded-md cursor-pointer pointer-events-auto right-96 uppercase font-Orbiton" onClick={handleDatasubmit}>{changeNextBtn() ? "Exit" : "next Level"}</button>
      }
      <div className="flex gap-4 mt-6">
        <DropDown
          options={themes}
          onSelect={handleTheme}
          theme={theme}
          value={theme}
          condition={"Theme"}
        />
        <DropDown
          options={languages}
          onSelect={handleLanguage}
          theme={theme}
          value={language}
          condition={"Language"}
        />
        <p className="text-center  text-xl font-bold  ">LEVEL: {currentLevel.levelIndex}</p>
        <p className="text-center  text-xl font-bold  ">QUESTION: {questionNo}</p>
        <div style={{border:"2px solid",borderRadius:"8px"}} 
        className="flex absolute bg-blue-500 h-12 shadow-md shadow-gray-500  w-fit p-2 right-52 mr-10 top-20 justify-center items-center">
          <Lottie animationData={timerAni} loop={timerRunning} className="w-20 -ml-6"/>
          <p className="text-xl font-mono font-bold">{formatTime(timer)}</p>
        </div>
        <div className="absolute right-10 top-22 flex">
          <button > 
            <VscCheck size={30} onClick={handleSubmit}  className={`mr-4 hover:scale-105 active:scale-90`}/>
          </button>
          <VscSave onClick={handleSave} title="Save" size={30} className="mr-4 cursor-pointer hover:scale-105 active:scale-90" />
          <VscPlay onClick={runCode} title="Run" size={30} className="pointer-events-auto cursor-pointer hover:scale-105 active:scale-90" />
        </div>
      </div>
      <div className="flex w-full gap-4 mt-7">
        <div className="w-fit mt-2   rounded-sm resize-x">
          <AceEditor
            mode={`${language === "cpp" ? "c_cpp" : language}`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            theme={`${theme ? theme : "dracula"}`}
            width="45rem"
            height="30rem"
            style={{border:"2px solid",borderRadius:"8px"}}
            showPrintMargin={false}
            className="shadow-md shadow-gray-500"
            fontSize={20}
            value={code}
            onChange={(e) => {
              language ?
               setCode(e) : toast.warning("Please Choose the language")
            }}
          />
        </div>
        <div style={{border:"2px solid",borderRadius:"8px"}} className={` w-full mt-2 h-[30rem] p-2 overflow-y-auto shadow-md shadow-gray-500`}>
          <div className="flex justify-between">
            <p className="text-2xl font-serif font-bold">Output:</p>
            <FaTrash size={22} onClick={clearOutput} className="pointer-events-auto m-1 cursor-pointer" title="clear output window"/>
          </div>
          <div className="w-full">
            {
              !Result ? 
                <div className="w-full flex justify-center">
                    <Lottie animationData={empty} className="w-96" loop={true}/>
                </div> 
              :
                Result.output === "Compiling" ?
                  <div className="w-full flex justify-center">
                       <Lottie animationData={loading} className="w-96" loop={true}/>
                  </div>
                :
                  Result.success ?
                  <div className="whitespace-pre mt-4 ml-4 font-mono text-xl">
                    <p>{Result.output}</p>
                  </div>
                  :
                  <div className="w-full flex flex-col">
                      <div className="w-full flex justify-center">
                       <Lottie animationData={error1} className="w-44 -mt-10" loop={true}/>
                      </div>
                       <p>{Result.output}</p>
                  </div>
                  
            }
          </div>
        </div>
      </div>
      <div className="flex w-full">
      <div className="flex w-full mt-6">
        <div className="flex  items-center w-fit z-30  px-5 gap-5" style={{border:"2px solid",borderRadius:"8px"}}>
          <img src="/assets/images/3.jpg" className="w-14 rounded-full shadow-sm shadow-black border-2 border-black"></img>
          <div className="flex flex-col items-center font-Orbiton font-bold">
            <p className="">Organised by</p>
            <p>R. Karthik Balan</p>
            <p>III BCA</p>
            {/* <p>Chairman of the Softech Association.</p> */}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end mt-6">
        <div className="flex  items-center w-fit z-30  px-5 gap-5" style={{border:"2px solid",borderRadius:"8px"}}>
          <img src="/assets/images/MwLogo.png" className="w-14"></img>
          <div className="flex flex-col items-center font-Orbiton font-bold">
            <p className="">Developed by</p>
            <p>P. Muneeswaran</p>
            <p>III BCA</p>
            {/* <p>Chairman of the Softech Association.</p> */}
          </div>
        </div>
      </div>
      </div>

      <ToastContainer position="top-right" stacked />
    </div>
  );
};

export default Editor;
