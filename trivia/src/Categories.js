import React, { useState } from 'react';


export default function Categories() {
    let categoryUrl = 'https://opentdb.com/api_category.php';
    const axios = require('axios');

    const [categories, setCategories] = useState([])

    React.useEffect(() => {
        axios.get(categoryUrl)
            .then(res => {
                const newCategories = res.data.trivia_categories.map(obj => obj.name);
                setCategories(newCategories)
            })
    }, [])

    return (
        <div className='categories-container'>
            {categories.map((category) => (
                <h2>{category}</h2>
            ))}
        </div>
    )

}