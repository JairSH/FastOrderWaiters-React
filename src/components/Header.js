import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/components/Header.css'
import userIcon from '../assets/statics/user-icon.png'

const Header = props => {
  const { user } = props
  let hasUser = ''
  if (user) {
    hasUser = Object.keys(user).length > 0
  }
  const handleLogout = () => {
    console.log('-')
  }

  return (
    <header>
      <div className='header-menu-nav'>
        <div className='icon_fast'>
          <Link to='/'>
            <li>
              <a>FAST FOOD</a>
            </li>
          </Link>
        </div>
        <nav className='header__menu'>
          <ul className='header-right'>
            <li className='nav-icon-perfil'>
              <img src={userIcon} alt='' />
              <li className='perfil-menu'>
                <p>Perfil</p>
                <ul>
                  {hasUser
                    ? <li><a href='/'>{user.name}</a></li>
                    : null}
                  {hasUser
                    ? <li><a href='#logout' onClick={handleLogout}>Cerrar Sesion</a></li>
                    : <li><Link to='/login'>Iniciar Sesion</Link></li>}
                </ul>
              </li>
            </li>
          </ul>
        </nav>
      </div>
      <section className='section-menu-header'>
        <div>
          <ul>
            <Link to='/platillos/'>
              <li>
                <a>PLATILLOS</a>
              </li>
            </Link>
            <Link to='/bebidas/'>
              <li>
                <a>BEBIDAS</a>
              </li>
            </Link>
            <Link to='/postres/'>
              <li>
                <a>POSTRES</a>
              </li>
            </Link>
            <Link to='/orden/'>
              <li>
                <a>CREAR ORDEN</a>
              </li>
            </Link>
          </ul>
        </div>
      </section>
    </header>
  )
}

export default Header
