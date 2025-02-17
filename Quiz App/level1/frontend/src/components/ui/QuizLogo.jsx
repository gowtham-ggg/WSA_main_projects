import React from 'react'
import assets from '../../assets/assets'


const QuizLogo = ({size = "small"}) => {
    const allSizes = {
        small : 168, large : 306
    }
  return (
    <img src={assets.quizLogo} alt='quiz logo'  width={allSizes[size]}/>
  )
}

export default QuizLogo
