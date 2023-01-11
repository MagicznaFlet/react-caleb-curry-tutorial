import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DefinitionSearch() {
    const [word, setWord] = useState('');
    const navigate = useNavigate();


    return (
        <form
            className='flex justify-center space-x-2 max-w-[300px]'
            onSubmit={() => {
                navigate('/dictionary/' + word,);
            }}>
            <input
                className='shrink min-w-0 px-2 py-1 shadow-xl'
                placeholder='Dinosaur'
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);
                }} />
            <button
                className='bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1 rounded'>
                Search
            </button>
        </form>
    );
}