import { useEffect, useRef, useState } from "react";
import { getData, getFlag, getLevelsData, setFlag } from "../Database/functions/addData";
import { FormData } from "../Components/Form";
import { toast, ToastContainer } from "react-toastify";
import DisplayUsers from "../Components/DisplayUsers";
import { answerType, Level } from "../types/QuestionType";
import CreateQuestions from "../Components/CreateQuestions";
import ManageQuestions from "../Components/ManageQuestions";
import { BsPeopleFill } from "react-icons/bs";
import { RiDashboardFill, RiSettings5Fill } from "react-icons/ri";
import { IoMdCreate } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { SiPhpmyadmin } from "react-icons/si";

export interface userDataType {
  key: string;
  formData: FormData;
  codeData: answerType;
}
const Admin = () => {
  const [userData, setUserData] = useState<userDataType[]>();
  const [levelData,setLevelData] = useState<Level[]>();
  const userName = useRef<HTMLInputElement | null>(null);
  const passWord = useRef<HTMLInputElement | null>(null);
  const [verified, setverified] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem("adminVerified")) || false;
  });
  const [showPanels, setShowPanels] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const temp = await getData();
      const data = Object.entries(temp).map(([_, value]) => ({
        ...(value as userDataType),
      }));
      setUserData(data);
      console.log(data);
        const getdata: Level[] = await getLevelsData();
        setLevelData(getdata);
    };
    fetchData();
  }, []);
  const [flag, setflag] = useState<boolean>();
  const handleFlag = async () => {
    setflag(!flag);
    await setFlag(!flag);
  };
  useEffect(() => {
    const fetchData = async () => {
      const flagdata = await getFlag();

      setflag(flagdata);
    };
    fetchData();
  }, []);
  const handleVerified = () => {
    const user = userName.current?.value;
    const pass = passWord.current?.value;
    if (user === "MW" && pass === "12345678") {
      setverified(!verified);
      sessionStorage.setItem("adminVerified", "true");
    } else {
      toast.error("Invalid Credentials");
    }
  };
  const handleShowPanels = (i: number) => {
    setShowPanels((e) => {
      const temp = [...e];
      temp[i] = true;
      for (let j = 0; j < temp.length; j++) {
        if (j != i) {
          temp[j] = false;
        }
      }
      return temp;
    });
  };
  return (
    <div className="flex flex-col bg-[#E5E5E5] font-Roboto">
      {verified && (
        <div className="w-full h-14 bg-white flex items-center gap-2  font-extrabold text-[#2F80ED] text-2xl p-2 uppercase">
          <BiUserCircle size={30} />
          <p>Admin</p>
        </div>
      )}
      {!verified ? (
        <div className="h-screen w-full p-10 text-black flex justify-center items-center">
          <div className="bg-[#2F80ED] flex  w-[65rem] h-fit gap-2 p-3 border-2 border-white rounded-md shadow-md shadow-black">
            <div className=" w-[50rem] text-white flex justify-center items-center h-[35rem] adminImg  rounded-md bg-[#2f81edaf]">
              <SiPhpmyadmin size={200} />
            </div>
            <div className="flex p-10 flex-col w-[40rem] bg-white rounded-lg justify-center items-center gap-4">
              <p className="font-Roboto font-extrabold text-3xl">Admin Login</p>
              <div className="w-full">
                <p className="text-xl  font-semibold">userName:</p>
                <input
                  type="text"
                  ref={userName}
                  className="w-full text-2xl p-2 border-2 border-black rounded-md"
                />
              </div>
              <div className="w-full">
                <p className="text-xl font-semibold">passWord:</p>
                <input
                  type="password"
                  ref={passWord}
                  className="w-full text-2xl p-2 border-2 border-black rounded-md"
                />
              </div>
              <button
                type="button"
                className="text-xl h-14 w-full border-2 border-black rounded-md cursor-pointer hover:bg-[#2f81edaf]  font-semibold bg-[#2F80ED]"
                onClick={handleVerified}
              >
                LogiN
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" rounded-lg gap-3 font-Roboto p-3  h-screen flex overflow-auto">
          {/* SideBar Section */}
          <div className="h-screen w-72 p-5 gap-3 rounded-lg font-Roboto flex flex-col  bg-white ">
            <div
              className="cursor-pointer hover:text-[#2F80ED] flex gap-5 items-center hover:bg-[#2f81ed25]  rounded-lg p-3 "
              onClick={() => {
                handleShowPanels(0);
              }}
            >
              <BsPeopleFill size={30} />
              <p>Students</p>
            </div>
            <div
              className="cursor-pointer flex gap-5 hover:text-[#2F80ED] items-center hover:bg-[#2f81ed25]  rounded-lg p-3"
              onClick={() => {
                handleShowPanels(1);
              }}
            >
              <RiDashboardFill size={30} />
              <p>DashBoard</p>
            </div>
            <div
              className="cursor-pointer flex gap-5 hover:text-[#2F80ED] items-center hover:bg-[#2f81ed25]  rounded-lg p-3"
              onClick={() => {
                handleShowPanels(2);
              }}
            >
              <IoMdCreate size={30} />
              <p>Create</p>
            </div>
            <div
              className="cursor-pointer flex gap-5 hover:text-[#2F80ED] items-center hover:bg-[#2f81ed25]  rounded-lg p-3"
              onClick={() => {
                handleShowPanels(3);
              }}
            >
              <RiSettings5Fill size={30} />
              <p>Manage</p>
            </div>
          </div>
          {/* DisplaySection */}
          <div className="w-full  rounded-lg">
            {/* Registered Students Section */}
            {showPanels[0] && (
              <div className="w-full bg-white p-5 rounded-lg">
                <DisplayUsers
                  flag={flag!}
                  userData={userData!}
                  levelData={levelData!}
                  display={false}
                  handleFlag={handleFlag}
                />
              </div>
            )}
            {showPanels[1] && (
              <div className="w-full mr-10 bg-white rounded-lg p-10">
                <DisplayUsers
                  flag={flag!}
                  userData={userData!}
                  levelData={levelData!}
                  display={true}
                  handleFlag={handleFlag}
                />
              </div>
            )}
            {showPanels[2] && (
              <div className="w-full bg-white rounded-lg  p-5 overflow-auto">
                <CreateQuestions />
              </div>
            )}
            {showPanels[3] && (
              <div className="w-full bg-white rounded-lg p-5 ">
                <ManageQuestions />
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Admin;
