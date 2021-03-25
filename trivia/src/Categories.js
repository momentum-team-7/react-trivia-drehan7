import React, { useState } from 'react';


export default function Categories(props) {


    return (
        <div className='categories-container'>

            <h1 className='select-prompt'>Select a Category!</h1>
            {props.categories.map((category) => (
                <button key={category.id} id={category.id} className='select-category-button button' onClick={() => props.setSelectedCategory(category.id)}>{category.name}</button>

            ))}
        </div>
    )

}