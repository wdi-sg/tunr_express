const React = require('react');
class Artist extends React.Component {
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
                        <div className="card" style={{width: "24rem"}}>
                            <img className="card-img-top" src={photoUrl} alt={name} style={{height: "20rem"}}/>
                            <div className="card-body">
                                <h4 className="card-title text-center">{name}</h4>
                                <p className="card-text text-center">{nationality}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-3 d-flex justify-content-end'>
                            <button className='btn btn-dark'><a href='/artists/list' className='text-white text-decoration-none'>Back to Artist List</a></button>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                        <br/>
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Artist;