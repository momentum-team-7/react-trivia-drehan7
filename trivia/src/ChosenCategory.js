import React, { useState, useEffect, useLayoutEffect } from 'react';


export default function ChosenCategory({ selectedCategory, setSelectedCategory, score, setScore }) {
    // questions contains question, answer, and all incorrect choices
    const [questions, setQuestions] = useState([])
    const [category, setCategory] = useState('')
    const [answers, setAnswers] = useState([])
    const [choices, setChoices] = useState([])
    const [index, setIndex] = useState(0)

    const axios = require('axios')
    let he = require('he')

    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)
            .then(res => {
                const newQuestions = res.data.results.map(obj => obj)
                const newAnswers = res.data.results.map(obj => obj.correct_answer)
                const category = newQuestions[0].category
                setCategory(category)
                setQuestions(newQuestions)
                setAnswers(newAnswers)
                // console.log(newQuestions)

            })

    }, [])


    const submitAnswer = (e) => {
        const selectedAnswer = e.target.textContent
        if (selectedAnswer in answers) {
            setScore(score + 1)
        }
        if (index === questions.length - 1) {
            setCategory(null)
        }
        setIndex(index + 1)

    }

    const getAnswerChoices = (question) => {
        const correct = question.correct_answer
        const incorrect = question.incorrect_answers
        incorrect.push(correct)
        const allQ = incorrect

        if (question.type === 'boolean') {
            return allQ.slice(0, 2)
        }

        return allQ.slice(0, 4)

    }

    return (
        <div className='questions-container'>
            <h1>{category}</h1>
            <button className="back-button button" onClick={() => setSelectedCategory(null)}>Back</button>

            {questions[index] ? (
                <div className="q-a-container">
                    <h1>Question: {index + 1}</h1>
                    <div className="q">
                        <h1>{he.decode(questions[index].question)}</h1>
                    </div>
                    <div className="answer-choices-container">
                        {getAnswerChoices(questions[index]).map((choice) => (
                            <h4>{choice}</h4>
                        ))}
                    </div>
                </div>
            ) : (
                <h1>Still loading...</h1>
            )}



        </div>

    )
}