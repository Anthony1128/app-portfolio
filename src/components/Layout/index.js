import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'
import Hexes from "../../assets/images/hexes.png";

const Layout = () => {
    return (
        <div className='App'>
            <Sidebar />
            <div className='Page'>
                <img className='tags top-tag' src={Hexes} />

                <Outlet />

                <img className='tags bottom-tag' src={Hexes} />
            </div>
        </div>
    )
}

export default Layout