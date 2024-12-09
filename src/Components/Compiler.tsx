
import  React, { useRef, useEffect, useState } from "react";
import Editor from "./Editor";
import { Level } from "../types/QuestionType";

interface CompilerProps{
  questionNo:number,
  currentLevelData:Level, 
  increaseLevel: () => void,
  useLevel:boolean,
  level:number
}
export interface ResultType {
  output:string,  
  success:boolean
}
const Compiler:React.FC<CompilerProps> = ({questionNo,currentLevelData,useLevel,level,increaseLevel}) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [result,setResult] = useState<ResultType | null>(null);
  const [IsCodeChanged,SetCodeChanged] = useState(false);
  // const [number,setnum] = useState(null);

  const ExecuteCode =  (code:string, language:string, file:string) => {
    const iFrame = iFrameRef.current;
    setResult({
      output:"Compiling",
      success:true
    });
    if(!iFrame || !iFrame.contentWindow) return
    iFrame.contentWindow.postMessage(
      {
        eventType: "populateCode",
        language: language,
        files: [
          {
            name: file,
            content: code,
          },
        ],
      },
      "*"
    );
    SetCodeChanged(true);
    console.log('code changed successfully');
    console.log(language);
    console.log(code);
  };
  const TriggerRun = () => {
    const iFrame = iFrameRef.current;
    if(!iFrame || !iFrame.contentWindow) return
    if (iFrame) {
      iFrame.contentWindow.postMessage(
        {
          eventType: "triggerRun",
        },
        "*"
      );
    }
  };
  useEffect(() => {
    TriggerRun();
    const Handle = (e:MessageEvent) => {
      if (e.data && e.data.language) {
        //console.log(e.data.result.output);
        setResult({
          output:e.data.result.output,
          success:e.data.result.success
        });
        console.log(result);
        SetCodeChanged(false);
        //SetCodeChanged(false);
      }
    };
    window.addEventListener("message", Handle);
    return () => {
      window.removeEventListener("message", Handle);
    };
  },[IsCodeChanged]);

  const handleClearResult = () =>{
    setResult(null)
  }
  // useEffect(() => {
  //   console.log(result);
  // }, [result,number]);

  // const handleNumber = ()=>{
  //   setnum(no);
  //   return number;
  // }
  return (
    <div className="cmp">
    <iframe
      ref={iFrameRef}
      height="450px"
      src="https://onecompiler.com/embed/python?codeChangeEvent=true&listenToEvents=true&theme=dark"
      width="100%"
      className="iframe hidden"
    ></iframe>
    <Editor useLevel={useLevel} levelIndex={level} currentLevel={currentLevelData} increaseLevel={increaseLevel} ExecuteCode={ExecuteCode} Result={result} questionNo={questionNo} clearOutput={handleClearResult}/>
    </div>
  );
};

export default Compiler;
