import {createContext, useContext, useEffect, useState} from 'react'
import { IContextType, IUser } from '../types'
import { getCurrentUser } from '../lib/appwrite/api'
import { useNavigate } from 'react-router-dom'

export const INITITAL_USER = {
    id: '',
    name: '',
    username: '',
    password: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITITAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean

}

const AuthContext = createContext<IContextType>(INITIAL_STATE)
function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<IUser>(INITITAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser()
            if(currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })

                setIsAuthenticated(true)
                return true
            }
            return false
            
        } catch (error) {
            console.log(error)
            return false            
        } finally {
            setIsLoading(false)
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        if(
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        ) navigate('/sign-in')
        checkAuthUser()
    }, [])
    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)