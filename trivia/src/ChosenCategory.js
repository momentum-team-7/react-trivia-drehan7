import React, { useState, useEffect } from 'react';


export default function ChosenCategory({ selectedCategory, setSelectedCategory }) {
    // questions contains question, answer, and all incorrect choices
    const [questions, setQuestions] = useState([])
    const [category, setCategory] = useState('')
    const axios = require('axios')
    let he = require('he')

    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)
            .then(res => {
                const newQuestions = res.data.results.map(obj => obj)
                const category = newQuestions[0].category
                setCategory(category)
                setQuestions(newQuestions)
            })

    }, [])

    return (
        <div className='questions-container'>
            <h1>{category}</h1>
            <button className="back-button button" onClick={() => setSelectedCategory(null)}>Back</button>
            {questions.map((ques) => (
                <ul>
                    <li>{he.decode(ques.question)}</li>
                    <ul>
                        <li>{he.decode(ques.correct_answer)}</li>
                    </ul>
                </ul>
            ))}
        </div>
    )
}