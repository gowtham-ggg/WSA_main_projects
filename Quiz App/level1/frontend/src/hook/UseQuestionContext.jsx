import { useContext } from 'react'
import QuestionContext from '../store/QuestionContext'

const UseQuestionContext = () => {
  return  useContext(QuestionContext)
}
 
export default UseQuestionContext
