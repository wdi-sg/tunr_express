const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class LoginForm extends React.Component {

    render() {

        return (

            <html>
                <div className="overlay"></div>
                <Head />
                <script defer src="" />
                <body>
                    <Header />
                    <div className="nav">
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                    </div>
                    <main>
                        <div className="form__wrapper">
                            <form method="POST" action={`/auth/login`} className="add-form">
                                <h2 className="add-form__header">Login</h2>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="email"></input>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="password"></input>
                                <button className="add-form__submit-btn login-btn" type="submit">Go</button>
                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = LoginForm;