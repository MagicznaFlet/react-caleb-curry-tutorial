import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { baseUrl } from '../shared';

import NotFound from './404';

export default function Customer() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({});
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    navigate("/404/");
                    setNotFound(true);
                }
                return response.json();
            })
            .then((data) => {
                setCustomer(Object(data.customer))
            })
    }, []);

    return (
        <>
            {notFound ? <NotFound /> : null}
            {customer ?
                <div>
                    <p>ID: {customer.id}</p>
                    <p>Name: {customer.name}</p>
                    <p>Industry: {customer.industry}</p>
                </div>
                : null}
            <button onClick={(e) => {
                const url = baseUrl + 'api/customers/' + id;
                fetch(url, {
                    method: 'DELETE', headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Something went wrong');
                        }
                        navigate('/customers/')
                    })
                    .catch((e) => {
                        console.log(e)
                        navigate('/404/')
                    })
            }}>DELETE</button>
            <br></br>
            <Link to="/customers/">Go back</Link>
        </>
    )
}