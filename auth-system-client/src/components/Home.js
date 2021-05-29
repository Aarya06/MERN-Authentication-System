import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ data, onLogout }) => {
    return (
        <div className="align">
            <div className="grid align__item">
                <div className="register">
                    {
                        data?.email ? <>
                            <h2>WELCOME</h2>
                            <p>{data.email}</p>
                            <p className="home-logout" onClick={onLogout}>Log out</p>
                            </> :
                            <Link to='/login'>Log in</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home