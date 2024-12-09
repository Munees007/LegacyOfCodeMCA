import { useEffect, useState } from "react";
import Compiler from "../Components/Compiler";
import "../Modules/themes";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import "../Modules/questions";
import Question from "../Components/Question";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Lottie from "lottie-react";
import normalLoading from "../assets/animations/normalLoading.json";
import { useNavigate } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import FullQuestion from "../Components/FullQuestion";
import { answerType, Level } from "../types/QuestionType";
import { addCodeData, getLevelsData } from "../Database/functions/addData";
import { getCurrentLevelIndex } from "../Components/Editor";

const CodeSpace = () => {
  const navigate = useNavigate();
  const dateObj = new Date();
  useEffect(() => {
    const date = localStorage.getItem("date");
    const temp = localStorage.getItem("formSubmitted");
    if(date === dateObj.toLocaleDateString())
    {
      if (!temp) {
        navigate("/");
      }
    }
    else{
      navigate("/");
    }
    
  }, [navigate]);
  const [theme, setTheme] = useState<string>(() => {
    const temp = localStorage.getItem("theme");
    return temp ? temp : "dracula";
  });
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [levelData, setLevelData] = useState<Level[] | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [useLevel,setUseLevel] = useState<boolean>(false);
  const [levelIndex,setLevelIndex]= useState<number>(0);
  const [_, setGameOver] = useState<boolean>(false);
  useEffect(() => {
    const FectchData = async () => {
      const temp: Level[] = JSON.parse(localStorage.getItem("UselevelData")!);
      if (temp) {
        setLevelData(temp);
      } else {
        const getdata: Level[] = await getLevelsData();
        setLevelData(getdata);
        localStorage.setItem("UselevelData", JSON.stringify(getdata));
      }
    };
    FectchData();
  }, [navigate]);
  useEffect(() => {
    const temp: number = parseInt(localStorage.getItem("LevelIndicator")!);
    if (levelData) {
      if (temp) {
        if (temp == levelData.length) navigate("/thankYou");
        // Use the stored question index
        if (!(temp < levelData.length)) return;
        levelData && setCurrentLevel(levelData[temp]);
      } else {
        // Generate a new random number and store it
        localStorage.setItem("LevelIndicator", "0");
        levelData && setCurrentLevel(levelData[0]);
      }
      levelData &&
        localStorage.setItem("MaxLength", levelData?.length.toString());
    }
  }, [levelData, currentLevel]);
  const [showSlide, setShowSlide] = useState<boolean>(false);
  const [currenQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [completedData, setCompletedData] = useState<Level[]>(()=>{
    const temp = localStorage.getItem("completedData");
    if(temp)
    {
      return JSON.parse(temp)
    }
    else{
      return []
    }
  });
  const handleQuestion = (value: number, status: boolean,useLevel:boolean,level:number) => {
    setCurrentQuestionIndex(value);
    console.log(value)
    setUseLevel(useLevel)
    setLevelIndex(level);
    setShowSlide(status);
    console.log(useLevel + " " + level)
  };
  const handleShowSlide = () => {
    setShowSlide(!showSlide);
  };
  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("theme") || "dracula";
      if (storedTheme !== theme) {
        setTheme(storedTheme);
      }
    };

    // Check theme on mount
    checkTheme();

    // Poll for changes every second
    const interval = setInterval(checkTheme, 10);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [theme]);

  const getCurrentQuestion = () => {
    console.log(currenQuestionIndex);
    return currentLevel?.questions[currenQuestionIndex - 1];
  };

  const increaseLevel = async () => {
    let level: number = getCurrentLevelIndex();
    console.log("triggered","level", level);
    if (levelData) {
      if (level < levelData?.length - 1) {
        level++;
        setCurrentLevel(levelData[level]);
        setCompletedData((prev) => {
          const newData = [...prev!];
          newData.push(levelData[level - 1]);
          localStorage.setItem("completedData",JSON.stringify(newData));
          return newData;
        });
        
        localStorage.setItem("LevelIndicator", level.toString());
        handleQuestion(1,false,false,level);
        toast.success(`Level${level-1} Completed`);
      } else {
        localStorage.setItem("LevelIndicator", (level + 1).toString());
        localStorage.setItem("gameover", "true");
        setCurrentLevel(null);
        setGameOver(true);
        const codeData: answerType = JSON.parse(
          localStorage.getItem("codeData")!
        );
        try {
          await addCodeData(codeData);
          navigate("/thankYou", { replace: true });
        } catch (error) {}
        console.log("gameovered successfully");
      }
    }
  };

  return (
    <div>
      {currentLevel ? (
        <div className={`ace-${theme} relative w-full`}>
          <VscArrowRight
            title="Click to see Questions"
            size={35}
            onClick={handleShowSlide}
            className={`absolute left-0 z-50 top-5 ace-${theme}   animate-scale cursor-pointer  ${
              showSlide ? "hidden" : ""
            }`}
          />

          <div
            className={`absolute z-50 left-0 h-screen overflow-y-auto transform${
              showSlide ? "translate-x-0" : "hidden -translate-x-full"
            } text-black border-2 w-96 ace-${theme} duration-500`}
          >
            <div className="w-full flex justify-end pr-2">
              <VscArrowLeft
                size={35}
                title="Close SlideBar"
                onClick={handleShowSlide}
                className={` ace-${theme}  z-50 top-3 animate-scale cursor-pointer ${
                  showSlide ? "" : "hidden"
                }`}
              />
            </div>
            <div className={`z-50 ace-${theme ? theme : "dracula"}`}>
              <p className="text-2xl font-mono m-2">
                Level{getCurrentLevelIndex()}
              </p>
              {currentLevel?.questions?.map((question, index) => (
                <Question
                  key={index}
                  useLevel={false}
                  level={index}
                  question={question}
                  questionNo={index + 1}
                  setQuestion={handleQuestion}
                  theme={theme}
                  setShowQuestion={setShowQuestion}
                />
              ))}
              <p className="text-2xl font-mono m-2">Completed</p>
              <div>
                {completedData?.map((value, index) => (
                  <div key={index}>
                    <p>Level {index}</p>
                    {value.questions.map((question, questionIndex) => (
                      <Question
                        level={index}
                        useLevel={true}
                        key={questionIndex} // Always add a key when mapping
                        question={question}
                        questionNo={questionIndex + 1} // Correctly increment question number
                        setQuestion={handleQuestion}
                        theme={theme}
                        setShowQuestion={setShowQuestion}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Compiler
            increaseLevel={increaseLevel}
            questionNo={currenQuestionIndex}
            currentLevelData={currentLevel}
            level={levelIndex}
            useLevel={useLevel}
          />
          {showQuestion && (
            <FullQuestion
              theme={theme}
              getCurrentQuestion={getCurrentQuestion}
              setShowQuestion={setShowQuestion}
            />
          )}
          <div className="absolute bottom-0 flex justify-center w-full">
            <span
              onClick={() => {
                setShowQuestion(true);
              }}
              className={`-rotate-90 ${showQuestion ? "hidden" : ""}`}
            >
              <MdDoubleArrow
                size={45}
                className=" cursor-pointer opacity-50 animate-scale"
              />
            </span>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div
          className={`w-full flex justify-center h-screen items-center bg-black`}
        >
          <Lottie animationData={normalLoading} loop={true} className="w-44" />
        </div>
      )}
    </div>
  );
};
export default CodeSpace;
