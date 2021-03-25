import React, { useState, useEffect } from 'react';


export default function ChosenCategory({ selectedCategory, setSelectedCategory }) {
    // questions contains question, answer, and all incorrect choices
    const [questions, setQuestions] = useState([])
    const axios = require('axios')
    let he = require('he')

    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)
            .then(res => {
                const newQuestions = res.data.results.map(obj => obj)
                console.log(newQuestions)
                setQuestions(newQuestions)
            })

    }, [])

    return (
        <>
            <button className="back-button button" onClick={() => setSelectedCategory(null)}>Back</button>
            {questions.map((ques) => (
                <h1>{he.decode(ques.question)}</h1>
            ))}
        </>
    )
}