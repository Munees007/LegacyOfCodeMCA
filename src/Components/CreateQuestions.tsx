import React, {useState } from "react";
import {questionType } from "../types/QuestionType";
import { addQuestion } from "../Database/functions/addData";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';

const CreateQuestions = () =>{
    const [data,setData] = useState<string[]>(Array(9).fill(""));
    const [selectedLevel, setSelectedLevel] = useState<number>(0); // Default to 0
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const Data:questionType = {
            title:data[0],
            content:{
                problem:data[1],
                input:data[2],
                output:data[3],
                example1:{
                    input:data[4],
                    output:data[5],
                },
                example2:{
                    input:data[6],
                    output:data[7]
                },
                answer:data[8]
            }
        }
        try{

            await addQuestion(Data,selectedLevel);
            setData(Array(9).fill(""));
            toast.success("question added");
        }
        catch(e)
        {
            toast.error("Unknown error");
        }
    }
    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...data];
        newData[index] = e.target.value;
        setData(newData);
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel(Number(e.target.value));
    };
    return(
        <div className="w-full  p-3">
            <div className="relative">
                <p className="text-2xl uppercase text-center font-bold">Question Creation</p>
                <select value={selectedLevel} onChange={handleSelectChange} className="absolute right-0 text-sm border-2 border-black shadow-md shadow-black rounded-md">
                    <option value={0}>Level0</option>
                    <option value={1}>Level1</option>
                    <option value={2}>Level2</option>
                </select>
            </div>
            <form className="flex flex-col gap-4 overflow-auto" onSubmit={handleSubmit}>
                <div>
                    <p className="text-xl font-semibold font-mono">Title:</p>
                    <input type="text" className="pl-3 w-full h-10 border border-black rounded-md mt-2
                    shadow-md shadow-black" required value={data[0]||""} onChange={handleChange(0)}/>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Problem Statement:</p>
                    <input type="text" multiple={true} className="pl-3 w-full h-10 border border-black rounded-md mt-2
                    shadow-md shadow-black" required value={data[1]||""} onChange={handleChange(1)}/>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Input:</p>
                    <input type="text" className="pl-3 w-full h-10 border border-black rounded-md mt-2
                    shadow-md shadow-black" required value={data[2]||""} onChange={handleChange(2)}/>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Output:</p>
                    <input type="text" className="pl-3 w-full h-10 border border-black rounded-md mt-2
                    shadow-md shadow-black" required value={data[3]||""} onChange={handleChange(3)}/>
                </div>
                <div className="">
                        <p className="text-xl font-semibold font-mono">Answer:</p>
                        <input type="text" className="pl-3 w-full h-10 border border-black rounded-md mt-2
                        shadow-md shadow-black" required value={data[8]||""} onChange={handleChange(8)}/>
                </div>
                <button type="submit" className="border-2 border-black rounded-md p-2 text-2xl font-mono bg-[#2F80ED] hover:bg-[#2f81edaf] text-black">SUBMIT</button>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default CreateQuestions;