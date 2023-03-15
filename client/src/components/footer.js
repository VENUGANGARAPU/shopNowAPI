import React from 'react';
import './styles/footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div className='footer'>
        <div className='footer-main'>
        <div className='list'>
            <p>About</p>
            <ul>
                <li><a style={{textDecoration:'none',color:'white'}} href="mailto:venu16046016@gmail.com">Contact us</a></li>
                <li>About us</li>
                <li>careers</li>
            </ul>
        </div>
        <div className='list'>
            <p>Social</p>
            <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
            </ul>
        </div>
        <div className='list'>
            <p>payments</p>
            <ul>
                <li>Methods</li>
                <li>secure</li>
                <li>FAQ</li>
            </ul>
        </div>
        </div>
        <p>&copy; {year} <span style={{fontFamily:'cursive'}}>Shopnow</span></p>
    </div>
  )
}

export default Footer;