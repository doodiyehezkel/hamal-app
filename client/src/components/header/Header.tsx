import style from './Header.module.css'
import maromIcon from '../../assets/marom-icon.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContexts'
import { Link, useLocation } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";

export default function Header() {

    const authContext = useContext(AuthContext)
    const location = useLocation()

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const onLogoutHandler = async () => {
        const response = await fetch('/api/user/sign-out')
        if (response.ok) {
            authContext?.setAuth(null)
        }
    }

    const locationLink = () => {
        switch (location.pathname) {
            case '/':
                return <Link onClick={() => setIsProfileMenuOpen(false)} to={'/admin-dashboard'}>מנהל מערכת</Link>
            default:
                return <Link onClick={() => setIsProfileMenuOpen(false)} to={'/'}>דף הבית</Link>

        }
    }

    return (
        <header className={style['header-container']}>
            <div className={style['user-profile']} >
                {
                    authContext?.auth?.isLogin &&
                    <>
                        <button onClick={() => setIsProfileMenuOpen(prev => !prev)}> <CgProfile size={50} color="white" /></button>
                        {isProfileMenuOpen &&
                        <ul className={style['user-profile-menu']}>
                            {authContext.auth.role === 'su' && <li>{locationLink()}</li>}
                            <li ><button className={style['logout-btn']} onClick={onLogoutHandler}>התנתק</button></li>
                        </ul>
                        }
                        <div className={style['user-name']}> ברוך הבא, {authContext.auth.name}</div>
                    </>
                }
            </div>

            <div className={style['title']}>
                <h1>מערכת עדכוני חמ"ל</h1>
            </div>
            <div className={style['icon']}>
                <img src={maromIcon} alt="" />
            </div>
        </header>
    )
}