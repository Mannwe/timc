import React                from 'react'
import { Link }             from 'react-router-dom'

import './Menu.css'

const Menu = () => {

    return (
        <aside className="menu">
            <ul className='menu-list'>
                <li className='menu-block'>
                <Link 
                        className='menu-item'
                        to='/main'
                    >
                        Películas
                    </Link>
                </li>
                <li className='menu-block'>
                    <Link 
                        className='menu-item'
                        to='/loans'
                    >
                        Préstamos
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
 
export default Menu

