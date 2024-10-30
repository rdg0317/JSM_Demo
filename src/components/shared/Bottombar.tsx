import { Link, useLocation } from 'react-router-dom'
import { bottombarLinks} from '../../constants'

const Bottombar = () => {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
                        const isActive = pathname === link.route
                    return (
                            <Link
                            key = {link.label}
                            to = {link.route} 
                            className={` group ${isActive && ' bg-primary-500 rounded-[15px]'} flex-col flex-center p-2 transition`} >
                                <img
                                src = {link.imgURL}
                                alt={link.label}
                                className={`p-2 group-hover:invert-white ${isActive && 'group-hover:invert-white'}`}
                                />
                                <p className='tiny-medium text-light-2'>{link.label}</p>
                            </Link>
                    )
                    })}

    </section>
  )
}

export default Bottombar
