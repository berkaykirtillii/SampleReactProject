import { useEffect, useState } from "react";

export default function useFetchData(){
    const [users, setUsers] = useState([])
    const BASE_URL = "https://jsonplaceholder.typicode.com";

    useEffect(()=>{
        fetch(`${BASE_URL}/users`)
        .then(response => response.json())
        .then(data => setUsers(data))
    },[])

    return {users, setUsers}
}
