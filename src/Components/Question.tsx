import { VscCode } from "react-icons/vsc";
import '../Modules/themes';
import { questionType } from "../types/QuestionType";

interface QuestionProps{
    questionNo:number,
    question:questionType,
    theme:string,
    setQuestion:(value: number, status: boolean, useLevel: boolean, level: number) =>void,
    setShowQuestion: (value: React.SetStateAction<boolean>) => void,
    level:number,
    useLevel:boolean
}
export default function Question({questionNo,question,setQuestion,theme,level,useLevel,setShowQuestion}:QuestionProps) {
    const handleQuestion = ()=>{
        setQuestion(questionNo,false,useLevel,level);
    }
    const handleFullQuestion = () =>{
        setQuestion(questionNo,true,useLevel,level);
    }
    return (
    <div className={`ace-${theme ? theme : "dracula"} m-2  rounded-md p-2 border-2  font-mono flex flex-col`}>
        <p>{questionNo}.{question.title}</p>
        <span className="w-full flex justify-end">
            <p className="cursor-pointer hover:text-blue-400" onClick={()=>{setShowQuestion(true);handleFullQuestion()}}>Read more...</p>
        </span>
        <div className="w-full flex justify-end mr-3 mt-2" title="start code">
            <VscCode size={30} className="cursor-pointer hover:text-green-600" onClick={handleQuestion}/>
        </div>
        
    </div>
  )
}
