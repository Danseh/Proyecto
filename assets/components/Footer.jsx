import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer>
            <div className = "contacto">
                <div className="copyright">
                    <p className="mb-2">Copyright © 2022 ieshlanz. Todos los derechos reservados.</p>

                </div>
                <ul id = "footer1">
                    <li className = "footer1">
                        <a href="tel:958893230"><img id ="fonoimg" src="/img/telefono.png"/>958893230</a>
                    </li>

                </ul>
            </div>
    </footer>
  )
}

export default Footer