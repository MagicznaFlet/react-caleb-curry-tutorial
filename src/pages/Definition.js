import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import NotFound from './404';

export default function Definition() {
    const [word, setWord] = useState({});
    const [meanings, setMeanings] = useState([{}]);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    let { search } = useParams();

    useEffect(() => {
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;

        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(false);
                } else if (response.status === 401) {
                    navigate('/login');
                } else if (response.status === 500) {
                    setError(true);
                }

                if (!response.ok) {
                    setError(true);
                    throw new Error('Something went wrong');
                }

                return response.json();
            })
            .then((data) => {
                setWord(data[0]);
                setMeanings(data[0].meanings);
                console.log(data[0].meanings);
            }).catch((e) => {
                console.log(e.message);
            });
    }, []);

    if (notFound === true) {
        return (
            <>
                <NotFound />
                <Link to='/dictionary'>Search another</Link>
            </>
        )
    }
    if (error === true) {
        return (
            <>
                <p>Something went wrong, try again?</p>
                <Link to='/dictionary'>Search another</Link>
            </>
        )
    }

    return (
        <>{word ?
            <>
                <p className=''>Here is definition:</p>
                <p>Name: <span>{word.word}</span></p>
                {meanings.map((meaning) => {
                    return <p key={uuidv4()}>{meaning.partOfSpeech} </p>
                })}</>
            : null}
        </>
    )
}