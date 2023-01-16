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
        console.log('useEffect')
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
                console.log(data.customers)
                setCustomer(data.customers)
            })
    }, []);
    return (
        <>
            {notFound ? <NotFound /> : null}
            {customer ? (
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
            ) : null}
            <Link to="/customers/">Go back</Link>
        </>
    )
}