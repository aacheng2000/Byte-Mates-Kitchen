import React from "react";

function Footer () {
    return (
        <div className='footer'>

            <div className='contact-us'>
                <h3>Contact us</h3>
                <ul>
                    <li>Phone number: XXX-XXX-XXXX</li>
                    <li>Email: xxx@bytemateskitchen.com</li>
                    <li>
                        <div>
                            Mon-Fri: 8am-7pm EST<br />
                            Sat-Sun: 8am-6pm EST<br />
                        </div>
                    </li>
                   
                </ul>
            </div>

            <div className='our-company'>
                <h3>Our company</h3>
                <ul>
                    <li>About us</li>
                    <li>Careers</li>
                    <li>Store locations and events</li>
                </ul>
            </div>

            <div className='our-social-media'>
                <h3>Social Media</h3>
                <p>Show us your look with:</p>
                <ul>
                    <li>#CrateStyle</li>
                    <li>#CrateKidsStyle</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;