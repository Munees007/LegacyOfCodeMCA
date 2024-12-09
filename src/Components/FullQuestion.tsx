import React from "react";
import { CgClose } from "react-icons/cg";
import {questionType } from "../types/QuestionType";
interface FullQuestionProps {
  getCurrentQuestion?: () => questionType | undefined;
  theme: string;
  setShowQuestion: (value: React.SetStateAction<boolean>) => void;
}
const FullQuestion: React.FC<FullQuestionProps> = ({
  getCurrentQuestion,
  theme,
  setShowQuestion,
}) => {
  return (
    <div className="w-full absolute items-center z-50 top-0 h-screen flex justify-center">
      <div
        className={`w-[40rem] overflow-auto relative ace-${theme} border-2 rounded-md h-[38rem]`}
      >
        <div className="w-full flex  justify-end pr-2 pt-2">
          <CgClose
            size={30}
            className="cursor-pointer"
            onClick={() => {
              setShowQuestion(false);
            }}
          />
        </div>
        {getCurrentQuestion && (
          <div className="p-6">
            <h1 className="text-center uppercase font-bold text-2xl mb-4">
              {getCurrentQuestion()?.title}
            </h1>

            <div className="mb-4 border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Problem Statement:</h3>
              <div className="whitespace-pre-wrap">{getCurrentQuestion()?.content.problem}</div>
            </div>

            <div className="mb-4 border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Input:</h3>
              <div>{getCurrentQuestion()?.content.input}</div>
            </div>

            <div className="mb-4 border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Output:</h3>
              <div className="whitespace-pre-wrap">{getCurrentQuestion()?.content.output}</div>
            </div>
            <>{
                getCurrentQuestion()?.content.example1.input!=="" ? <>

            <div className="mb-4 border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Example 1:</h3>
              <div className="mb-2">
                <h4 className="font-semibold">Input:</h4>
                <div className="whitespace-pre-line">{getCurrentQuestion()?.content.example1.input}</div>
              </div>
              <div>
                <h4 className="font-semibold">Output:</h4>
                <div className="whitespace-pre-line">{getCurrentQuestion()?.content.example1.output}</div>
              </div>
            </div>
            </> : <></>
            }
            </>
            <>
            {
                getCurrentQuestion()?.content.example2.input !=="" ?
            <div className="mb-4 border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Example 2:</h3>
              <div className="mb-2">
                <h4 className="font-semibold">Input:</h4>
                <div>{getCurrentQuestion()?.content.example2.input}</div>
              </div>
              <div>
                <h4 className="font-semibold">Output:</h4>
                <div>{getCurrentQuestion()?.content.example2.output}</div>
              </div>
            </div> : <></>
            }
            </>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default FullQuestion;
