import './Forbidden.scss'

import { Link } from 'react-router-dom';

export const Forbidden = () => {
    return (
        <div id="forbidden">
            <div className="forbidden">
                <div className="forbidden-403">
                    <h1>Oops!</h1>
                    <h2>403 - Нямате право да достъпите тази страница</h2>
                </div>
                <Link className="link" to="/">Върнете се назад</Link>
            </div>
        </div>
    );
};