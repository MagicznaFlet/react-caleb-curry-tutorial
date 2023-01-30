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
    const [error, setError] = useState('');

    useEffect(() => {
        if (!customer) return;
        if (!tempCustomer) return;
        let equal = true;
        if (customer.name !== tempCustomer.name) equal = false;
        if (customer.industry !== tempCustomer.industry) equal = false;
        if (equal) setChanged(false)
    });

    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    navigate("/404/");
                    setNotFound(true);
                }
                if (!response.ok) throw new Error('Something went wrong');

                return response.json();
            })
            .then((data) => {
                setCustomer(Object(data.customer));
                setTempCustomer(Object(data.customer));
            })
            .catch((e) => {
                setError(e.message);
            })
    }, []);

    function updateCustomer(e) {
        e.preventDefault();
        const url = baseUrl + "api/customers/" + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                if (!response.ok) throw new Error('Something went wrong');
                return response.json();
            })
            .then((data) => {
                setChanged(false);
                setCustomer(Object(data.customer));
                setError(undefined);
            })
            .catch((e) => {
                console.log(e);
                setError(e.message);
            })
    }

    return (
        <div
            className='p-3'>
            {notFound ? <NotFound /> : null}
            {Object.keys(customer).length !== 0 ?
                <div className='mb-4'>
                    <form
                        id='customer'
                        className='w-full max-w-sm'
                        onSubmit={updateCustomer}>
                        <div className="md:flex md:items-center mb-6">
                            <div className='md:w-1/4'>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className='md:w-3/4'>
                                <input
                                    id="name"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full m-2 block px-4"
                                    type="text"
                                    value={tempCustomer.name}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({ ...tempCustomer, name: e.target.value });
                                    }} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className='md:w-1/4'>
                                <label htmlFor='industry'>Industry</label>
                            </div>
                            <div className='md:w-3/4'>
                                <input
                                    id='industry'
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full m-2 block px-4"
                                    type="text"
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({ ...tempCustomer, industry: e.target.value });
                                    }} />
                            </div>
                        </div>
                    </form>
                    {changed ? (
                        <div
                            className='mb-2'>
                            <button
                                className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
                                onClick={(e) => {
                                    setTempCustomer({ ...customer });
                                    setChanged(false);
                                }}>
                                Cancel
                            </button>
                            <button
                                className='bg-purple-600 hover:bg-purple-700 text-white font-bold ml-2 py-2 px-4 rounded'
                                form="customer">
                                Save
                            </button>
                        </div>
                    ) : null}
                    <div>
                        <button
                            className='bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
                            onClick={(e) => {
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
                    </div>
                </div>
                : null
            }
            {error ? <p>{error}</p> : null}
            <Link
                className='bg-purple-600 hover:bg-purple-700 text-white font-bold rounded py-2 px-4 no-underline'
                to="/customers/">
                &#8592; Go back
            </Link>

        </div>
    )
}