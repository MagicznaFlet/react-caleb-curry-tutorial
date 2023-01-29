import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { baseUrl } from '../shared';

import NotFound from './404';

export default function Customer() {
    const { id } = useParams('');
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({});
    const [tempCustomer, setTempCustomer] = useState({ id: '', name: '', industry: '' });
    const [notFound, setNotFound] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        let equal = true;
        if (customer.name !== tempCustomer.name) {
            equal = false;
        }
        if (customer.industry !== tempCustomer.industry) {
            equal = false;
        }
        if (equal) {
            setChanged(false)
        }
    });

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
                setCustomer(Object(data.customer));
                setTempCustomer(Object(data.customer));
            })
    }, []);

    function updateCustomer() {
        const url = baseUrl + "api/customers/" + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setChanged(false);
                setCustomer(data.customer);
            })
    }

    return (
        <>
            {notFound ? <NotFound /> : null}
            {customer ?
                <div>
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.name}
                        onChange={(e) => {
                            setChanged(true);
                            setTempCustomer({ ...tempCustomer, name: e.target.value });
                        }} />
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.industry}
                        onChange={(e) => {
                            setChanged(true);
                            setTempCustomer({ ...tempCustomer, industry: e.target.value });
                        }} />
                    {changed ? (
                        <>
                            <button
                                onClick={(e) => {
                                    setTempCustomer({ ...customer });
                                    setChanged(false);
                                }}>
                                Cancel
                            </button>
                            <button onClick={updateCustomer}>
                                Save
                            </button>
                        </>
                    ) : null}
                </div>
                : null}
            <button onClick={(e) => {
                const url = baseUrl + 'api/customers/' + id;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
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