const React = require('react');
class Show extends React.Component {
    render () {

        const name = this.props.name;
        const photoUrl = this.props.photo_url;
        const nationality = this.props.nationality;

        return (
             <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="card" style={{width: "23rem"}}>
                            <img className="card-img-top" src={photoUrl} alt={name} style={{height: "20rem"}}/>
                            <div className="card-body">
                                <h4 className="card-title text-center">{name}</h4>
                                <p className="card-text text-center">{nationality}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Show;