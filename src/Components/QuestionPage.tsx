import React, { useEffect, useState } from "react"
import { Level } from "../types/QuestionType"
import { getLevelsData } from "../Database/functions/addData";

import {  ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css"
interface DisplayLevelProps{
    data:Level,
    index:number,
}
const DisplayLevel:React.FC<DisplayLevelProps> = ({data,index}) =>{
    return (
        <div className="w-full   p-3  bg-[#2f81edaf] border-2 border-black shadow-md shadow-white rounded-md">
            <div className="w-full flex justify-between items-center">
                <p className="text-4xl text-black font-mono font-bold uppercase">Level:{index}</p>
                <p className="text-xl text-black font-mono font-bold uppercase">Total Questions: {data?.questions?.length}</p>
            </div>
            {
                data?.questions?.map((value,index)=>(
                    <div key={index} className="flex flex-col relative gap-5 w-full h-fit p-3 mt-3 bg-gray-200 border-2 border-black rounded-md">
                        <p className="text-3xl text-center text-black font-mono font-bold uppercase">Question {index+1}</p>
                        <div>
                    <p className="text-xl font-semibold font-mono">Title:</p>
                    <p className="text-3xl font-mono ml-2 mt-2 font-semibold">{value.title}</p>
                </div>
                <div>
                    <p className="text-xl  font-semibold  font-mono">Problem Statement:</p>
                    <p className="text-2xl font-mono whitespace-pre-line ml-2 mt-2 font-semibold">{value.content.problem}</p>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Input:</p>
                    <p className="text-2xl font-mono whitespace-pre ml-2 mt-2 font-semibold">{value.content.input}</p>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Output:</p>
                    <p className="text-2xl font-mono whitespace-pre ml-2 mt-2 font-semibold">{value.content.output}</p>
                </div>
                    </div>
                ))
            }
        </div>
    )
}

const QuestionPage = () =>{
    const [LevelData,setLevelData] = useState<Level[] | null>(()=>{
        const data:Level[] = JSON.parse(localStorage.getItem("levelData")!)
        return data ? data : null
    });
    useEffect(()=>{
        const FetchData = async () =>{
            const data:Level[] = await getLevelsData();
            console.log(data)
            console.log(data[0].levelIndex)
            if (data && data.length > 0) {
                setLevelData(data);
                localStorage.setItem("levelData", JSON.stringify(data));
              } else {
                console.log("No levels found.");
              }
        }
        FetchData();
    },[])
      // Delete handler
    return(
        <div className="w-full h-[43rem] overflow-auto flex flex-col gap-4">
            {LevelData === null ? (
        <p>No Data</p>
      ) : (
            <>
                {
                    
                    LevelData.map((value,index)=>(
                        <DisplayLevel data={value}  index={value.levelIndex ?? index} key={index}/>
                    ))
                }
            </>
      )}
      <ToastContainer/>
        </div>
    )
}

export default QuestionPage