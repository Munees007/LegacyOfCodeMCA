import { get, ref, serverTimestamp, set, update } from "firebase/database";
import { FormData } from "../../Components/Form";
import { db } from "../firebase";

import { answerType, Level, questionType } from "../../types/QuestionType";

export async function addData(formData:FormData){
    try {
        const roll = formData.rollNumber;
        
        const userRef = ref(db,`users/${roll}`);

        const userSnapShot = await get(userRef);
        if(userSnapShot.exists())
        {
            throw new Error("Already There")
        }
        else{
            await set(userRef,{ 
                formData:{
                    ...formData,
                    timestamp: serverTimestamp()
                } 
            });

            console.log("form submitted successfully");
        }

        
    } catch (error) {
        console.log(error);
    }
}
export async function addTimestampsToExistingUsers(): Promise<void> {
    try {
      const usersRef = ref(db, `users`);
      const snapshot = await get(usersRef);
  
      if (snapshot.exists()) {
        const updates: { [key: string]: any } = {};
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key!;
          const data = childSnapshot.val();
  
          // Check if formData exists and if timestamp is missing
          if (data.formData && !data.formData.timestamp) {
            updates[`${key}/formData/timestamp`] = 1727431200000;
          }
        });
  
        if (Object.keys(updates).length > 0) {
          await update(usersRef, updates);
          console.log("Timestamps added to existing users!");
        } else {
          console.log("All users already have timestamps.");
        }
      } else {
        console.log("No users found in the database.");
      }
    } catch (error) {
      console.error("Error adding timestamps to existing users:", error);
    }
  }
  
  
export async function addCodeData(codeData:answerType){
    try {
        const userData = localStorage.getItem("userData");
        const data = JSON.parse(userData!);
        const roll = data.rollNumber;

        const userRef = ref(db,`users/${roll}`);

        await update(userRef,{codeData});

        console.log("data submitted successfully");
    } catch (error) {
        console.log(error);
    }
}

export async function getData(){
    try {
        const userRef = ref(db,'users');

        const userSnapShot = await get(userRef);

        if(userSnapShot.exists())
        {
            return userSnapShot.val();
        }
        else{
            console.log("No data found");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function setFlag(val:boolean){
    try {
        const userRef = ref(db,'flag');
        await set(userRef,val);
    } catch (error) {
        console.log(error)
    }
}

export async function getFlag():Promise<boolean>{
    try {
        const userRef = ref(db,'flag');

        const userSnapShot = await get(userRef);

        if(userSnapShot.exists())
        {
            return userSnapShot.val()
        }
        else{
            throw new Error('no flag found');
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function addQuestion(newQuestion:questionType,levelIndex:number){
    try {
        const levelRef = ref(db, `levels/level${levelIndex}`);

    // Fetch the level data from Firebase Realtime Database
    const snapshot = await get(levelRef);

    if (snapshot.exists()) {
      const levelData = snapshot.val() as Level;

      // Ensure the questions array exists and is initialized
      const updatedQuestions = levelData.questions ? levelData.questions : [];

      // Add the new question to the end of the array
      updatedQuestions.push(newQuestion);

      // Update the level with the new questions array
      await update(levelRef, { questions: updatedQuestions });
      console.log(`Question added to the last position of level ${levelIndex}`);
    } else {
      // If the level doesn't exist, create it with the new question as the first entry
      const newLevelData: Level = {
        questions: [newQuestion],
        levelIndex:levelIndex
      };

      // Set the new level in Firebase
      await update(levelRef, newLevelData);
      console.log(`New level created with a question at level ${levelIndex}`);
    }
    } catch (error) {
        
    }
}
function unescapeString(value: any): any {
    if (typeof value === 'string') {
        // Replace double escape sequences like "\\t" with actual escape sequences like "\t"
        return value.replace(/\\t/g, '\t').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
    } else if (typeof value === 'object' && value !== null) {
        // If the value is an object or array, recursively unescape its properties or elements
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                value[key] = unescapeString(value[key]);
            }
        }
    }
    return value;
}


export async function getLevelsData():Promise<Level[]>
{
    try {
        const fieldRef = await ref(db,"levels");

        const snapshot = await get(fieldRef);

        if(snapshot.exists())
        {
            let data = snapshot.val();

            // Apply unescapeString to clean up escape sequences across the data
            data = unescapeString(data);

            // Convert the data to an array of Level objects
            const levelArray: Level[] = Object.values(data);
            console.log(levelArray);
            return levelArray;
        }
        else{
            throw new Error("nil")
        }
    } catch (error) {
        throw error
    }
}
export async function getLevelsObject():Promise<Level[]>
{
    try {
        const fieldRef = await ref(db,"levels");

        const snapshot = await get(fieldRef);

        if(snapshot.exists())
        {
            let data = snapshot.val();

            // Apply unescapeString to clean up escape sequences across the data
            data = unescapeString(data);

            // Convert the data to an array of Level objects
            
            return data;
        }
        else{
            throw new Error("nil")
        }
    } catch (error) {
        throw error
    }
}

export async function deleteQuestionFromLevel(levelIndex: number, questionIndex: number): Promise<void> {
    try {
      // Reference to the specific level in the database
      const levelRef = ref(db, `levels/level${levelIndex}`);
      const snapshot = await get(levelRef);
  
      if (snapshot.exists()) {
        const levelData: Level = snapshot.val();
  
        // Check if the level has questions and if the question index is valid
        if (levelData?.questions && questionIndex < levelData.questions.length) {
          // Remove the specific question from the questions array
          const updatedQuestions = levelData.questions.filter((_, idx) => idx !== questionIndex);
  
          // Update the level with the modified questions array
          await update(levelRef, { questions: updatedQuestions });
        } else {
          throw new Error("Invalid question index or no questions found");
        }
      } else {
        throw new Error("Level not found");
      }
    } catch (error) {
      console.error("Error deleting question: ", error);
      throw error;
    }
  }