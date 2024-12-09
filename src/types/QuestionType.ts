//question type
type example = {
    input:string,
    output:string
  }
type content = {
      problem:string,
      input: string,
      output:string,
      example1:example,
      example2:example,
      answer:string
  }
export type questionType = {
    title: string,
    content: content
}
export type Level = {
    questions:questionType[],
    levelIndex?:number
}
//answer type individual users
type answerFormat = {
  language:string,
  code:string,
  output:string,
  answered:boolean
}
export type answerLevel = {
  answer:answerFormat[],
  score?:number
}
export type answerType = {
  finalAnswer:answerLevel[],
  timeLeft ?: number
}
