const React = require('react');
class Show_Artist extends React.Component {
    render () {

        const id = this.props.id;
        const name = this.props.name;
        const photoUrl = this.props.photo_url;
        const nationality = this.props.nationality;
        const visitCounter = this.props.visitCounter;

        const songsPage = '/artists/' + id + '/songs';
        const editPage = '/artists/' + id + '/edit';
        const deletePage = '/artists/' + id + '?_method=delete';

        //Render page visit badges
        const visitCounterImageList = {
            "ten": "https://image.flaticon.com/icons/svg/744/744929.svg",
            "fifty": "https://image.flaticon.com/icons/svg/744/744922.svg",
            "hundred": "https://image.flaticon.com/icons/svg/744/744918.svg"
        }

        let visitCounterImage;;
        let visitCounterMessage = '';
        if (visitCounter >= 10 && visitCounter < 50) {
            visitCounterImage = visitCounterImageList.ten;
            visitCounterMessage = 'Newbie badge unlocked';
        } else if (visitCounter >= 50 && visitCounter < 100) {
            visitCounterImage = visitCounterImageList.fifty;
            visitCounterMessage = 'Novice badge unlocked';
        } else if (visitCounter >= 100) {
            visitCounterImage = visitCounterImageList.hundred;
            visitCounterMessage = 'Veteran badge unlocked';
        }

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="card" style={{width: "21rem"}}>
                            <img className="card-img-top" src={photoUrl} alt={name} style={{height: "18rem"}}/>
                            <div className="card-body">
                                <h4 className="card-title text-center">{name}</h4>
                                <p className="card-text text-center">{nationality}</p>
                                <div className='row justify-content-center'>
                                    <button className='btn btn-info'><a href={songsPage} className='text-white text-decoration-none'>Songs</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-end'>
                            <button className='btn btn-primary'><a href={editPage} className='text-white text-decoration-none'>Edit Profile</a></button>
                        </div>
                        <div className='col-2'>
                            <form method='POST' action={deletePage}>
                                <input className='btn btn-danger' type='submit' value='Delete Profile'/>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-3 d-flex justify-content-end'>
                            <button className='btn btn-secondary'><a href='/artists/list' className='text-white text-decoration-none'>Back to Artist List</a></button>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                </div>
                <br/><br/><br/>
                <div className='row justify-content-center'>
                    <p style={{color: "grey", borderTop: "1px solid gainsboro", borderBottom:"1px solid gainsboro", padding: "5px 20px"}}>Page Visits: {visitCounter}</p>
                </div>
                <div className='row justify-content-center'>
                    <img src={visitCounterImage} style={{width: "50px", padding: "0 0 8px 0"}}/>
                </div>
                <div className='row justify-content-center'>
                    <p style={{color: "grey"}}>{visitCounterMessage}</p>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Show_Artist;