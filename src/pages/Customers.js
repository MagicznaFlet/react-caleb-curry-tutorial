import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { baseUrl } from '../shared';

export default function Customers() {

    const [customers, setCustomers] = useState([{}])
    useEffect(() => {
        console.log("Feching...");
        const url = baseUrl + "api/customers/";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCustomers(data.customers)
            })
    }, [])

    return (
        <>
            {customers ? customers.map((customer) => {
                return (
                    <p>
                        <Link to={"/customers/" + customer.id}>{customer.name}</Link>
                    </p>
                )

            })
                : null
            }
        </>
    );
}