import { useContext, useEffect, useState, useTransition } from "react"
import { useLocation } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

export const useSessionTimer = () => {
    const location = useLocation()
    const [sessionExpired, setSessionExpired] = useState<boolean>(false)
    const { user, logout } = useContext(UserContext)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const now = new Date().getTime()
        if (user?.loginExpires < now) {
            startTransition(() => {
                logout()
                setSessionExpired(true)
            })
        } else {
            setSessionExpired(false)
        }
    }, [user.loginExpires, location.key])

    return {
        sessionExpired,
        isPending
    }
}
