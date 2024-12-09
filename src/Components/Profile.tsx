import { useLocation } from "react-router-dom";
import { userDataType } from "../Pages/Admin";
import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";
import { getScore } from "./DisplayUsers";
import { useEffect, useRef, useState } from "react";
import { Level } from "../types/QuestionType";
import { BiLeftArrow } from "react-icons/bi";

type stateType = {
  value: userDataType;
  levelData: Level[];
};
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};
export default function Profile() {
  const location = useLocation();
  const state: stateType = location.state || {};

  const Editor = useRef<(AceEditor | null)[][]>([]);
  const [isEditorsReady, setEditorsReady] = useState(false); // Track when refs are ready

  useEffect(() => {
    // Initialize refs based on codeData size
    const codeData = state?.value?.codeData;
    if (codeData) {
      const refs = codeData.finalAnswer.map(() =>
        Array.from({ length: codeData.finalAnswer[0]?.answer?.length || 0 }, () => null)
      );
      Editor.current = refs;
      setEditorsReady(true); // Set to true after initializing refs
    }
  }, [state]);

  useEffect(() => {
    // Log the session lengths only after the editors have mounted and are ready
    if (isEditorsReady) {
      Editor.current.forEach((levelRefs, levelIndex) => {
        levelRefs.forEach((editorRef, answerIndex) => {
          if (editorRef) {
            console.log(
              `Level ${levelIndex}, Question ${answerIndex} line length:`,
              editorRef.editor.session.getLength()
            );
          } else {
            console.log(`Editor ref not ready for Level ${levelIndex}, Question ${answerIndex}`);
          }
        });
      });
    }
  }, [isEditorsReady]); // Trigger effect only when editors are ready

  return (
    <div className="bg-[#E5E5E5] w-full h-screen p-3 overflow-auto">
      <BiLeftArrow size={25} onClick={() => { history.back() }} />
      <p className="font-Roboto text-center text-4xl uppercase font-bold mb-2">Profile</p>
      <div className="bg-white border-2 border-black rounded-md shadow-md shadow-black w-full text-black flex justify-around py-2">
        <p>{state?.value?.formData?.rollNumber}</p>
        <p>{state?.value?.formData?.name}</p>
        <p>{state?.value?.formData?.email}</p>
        {state?.value?.codeData ? (
          <>
            <p>{getScore(state.value)}</p>
            <p>{formatTime(60 * 150 - state?.value?.codeData?.timeLeft!)}</p>
          </>
        ) : (
          <>
            <p>-</p>
            <p>0m 0s</p>
          </>
        )}
      </div>
      <div className="whitespace-pre grid mt-5 grid-cols-1 gap-3">
        {state?.value?.codeData ? (
          state?.value?.codeData?.finalAnswer?.map((level, levelIndex) => (
            <div key={levelIndex} className="bg-white border-2 w-full h-full border-black rounded-md p-3 text-black font-mono">
              <p className="font-mono font-bold text-3xl">Level: {levelIndex}</p>
              {level?.answer?.map((answer, answerIndex) => (
                answer.answered && (<div key={answerIndex} className="bg-slate-400 p-3 mt-2 rounded-lg">
                  <p className="text-center font-mono font-bold text-3xl">Question: {answerIndex + 1}</p>
                  {/* <div>
                    <p className="font-mono font-bold text-2xl">Title:</p>
                    <p className="font-mono text-xl ml-3">{state?.levelData[levelIndex]?.questions[answerIndex]?.title}</p>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-2xl">Problem Statement:</p>
                    <p className="font-mono text-xl ml-3">{state?.levelData[levelIndex]?.questions[answerIndex]?.content?.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-2xl">Input:</p>
                    <p className="font-mono text-xl ml-3">{state?.levelData[levelIndex]?.questions[answerIndex]?.content?.input}</p>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-2xl">Output:</p>
                    <p className="font-mono text-xl ml-3">{state?.levelData[levelIndex]?.questions[answerIndex]?.content?.output}</p>
                  </div> */}
                  <p className="font-bold text-2xl">Language: {answer?.language}</p>
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">Code:</p>
                    <AceEditor
                      width="100%"
                      mode={`${answer.language === "cpp" ? "c_cpp" : answer?.language}`}
                      fontSize={18}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                      }}
                      readOnly
                      className="rounded-md border-2 border-gray-200 shadow-md shadow-black"
                      theme="ace-dawn"
                      ref={(el) => {
                        if (!Editor.current[levelIndex]) {
                          Editor.current[levelIndex] = [];
                        }
                        Editor.current[levelIndex][answerIndex] = el;
                      }}
                      value={answer?.code}
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <p className="font-bold text-xl">Output:</p>
                    <p className="mt-2 font-semibold">{answer?.output}</p>
                  </div>
                </div>)
              ))}
            </div>
          ))
        ) : (
          <div className="w-full">
            <p className="text-center">No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
