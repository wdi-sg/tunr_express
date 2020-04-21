const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class LoginRegister extends React.Component {
    render() {

        const displayInvalidMsg = () => {
            if (this.props.invalidMsg) {

                return (
                    <div className="invalid-msg__wrapper">
                        <p className="invalid-msg">{this.props.invalidMsg}</p>
                    </div>
                )

            } else {

                return;

            }
        }

        return (
            <html>
                <Head />
                <body>

                    <Header />
                    <main>

                    <div className="banner">
                        <div className="landing-page__nav">
                            <div className="overlay"></div>
                            <a href="/artists/" className=" landing-page-link">ARTISTS</a>
                        </div>
                    </div>
                    <div className="login-register__wrapper">
                            <a href="/auth/login" className="login-link"><p>Login</p></a>
                            <a href="/auth/register" className="register-link"><p>Register</p></a>
                    </div>
                    <div className="featured-artist login-register-page">
                        <h2 className="featured-artist__header login-register-page">Featured Artist</h2>
                        <a href={`./artists/${this.props.singleArtist.id}`} className="featured-artist__name">{this.props.singleArtist.name}</a>
                        <div className="featured-artist__img-wrapper">
                            <img className="featured-artist__img" src={this.props.singleArtist["photo_url"]} />
                        </div>
                    </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = LoginRegister;