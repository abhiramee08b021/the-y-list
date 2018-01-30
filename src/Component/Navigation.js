import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = ()=>{
    return(
    
            <nav className={'deep-purple darken-1'}>
                <div className={"nav-wrapper"}>
                    <ul className={'left'}>
                        <li>
                            <Link to={'/'}>
                                <a className={'white-text'}>Home</a>
                            </Link>    
                        </li>
                        <li>
                            <Link to={'/settings'}>
                                <a className={'white-text'}>Settings</a>
                            </Link>
                       </li> 
                        <li>
                            <Link to={'/about'}>
                                <a className={'white-text'}>About</a>
                            </Link>
                       </li> 
                    </ul>
                </div>
               
                 
            </nav>
        
    );
}
export default Navigation;