import { useState, useEffect, useContext } from 'react'
import AuthContext from '../AuthContext'
export default function UserDashboard() {
    const authContext = useContext(AuthContext)
    console.log(authContext.auth)
    const [deckList, setDeckList] = useState([])
    useEffect(() => {
        const id = localStorage.getItem("userId")
        fetch(`http://localhost:3001/deck/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDeckList(data.details)
            })
    }, [])
    return(
        <section>
            Hello user.
        </section>
    )
}

