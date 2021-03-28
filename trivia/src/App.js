import React, { useState, useEffect } from 'react';
import Categories from './Categories';
import ChosenCategory from './ChosenCategory';
import './App.css';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null)


  const axios = require('axios');
  const categoriesUrl = 'https://opentdb.com/api_category.php';

  useEffect(() => {
    axios.get(categoriesUrl)
      .then(res => {
        const newCategories = res.data.trivia_categories.map(obj => obj)
        setCategories(newCategories);
      })
  }, [])

  return (
    <>
      <h3 className='score-label'>Score: {score}</h3>
      {selectedCategory ?
        (<ChosenCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} score={score} setScore={setScore} />) : (
          <Categories categories={categories} setSelectedCategory={setSelectedCategory} />)
      }
    </>
  )

}