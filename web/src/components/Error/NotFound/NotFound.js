import './NotFound.scss'

import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>404 - Страницата не беше намерена</h2>
                </div>
                <Link className="link" to="/">Върнете се назад</Link>
            </div>
        </div>
    );
};