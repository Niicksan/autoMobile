import './Footer.scss';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleQuestion, faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
    return (
        <footer className="footer">
            <section className="center">
                <p>&#169; AutoMobile All Rights Reserved {new Date().getFullYear()}</p>
            </section>
        </footer>
    );
};