import React, { useEffect } from "react"


const getToken = () => {
    const [token, setToken] = React.useState<string | null>("")

    useEffect(() => {
        const data = localStorage.getItem("token")
        setToken(data)
    },[])

    return (
        <>
         {token}
        </>
    )
}

export { getToken }