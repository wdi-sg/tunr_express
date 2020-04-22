var React = require("react");

class Edit_Artist extends React.Component {
  render() {

    const name = this.props.artist[0].name;
    const photoUrl = this.props.artist[0].photo_url;
    const nationality = this.props.artist[0].nationality;
    const idPage = '/artists/' + this.props.artist[0].id + '?_method=put';
    const visitCounter = this.props.visitCounter;

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
                <h1 className='text-center'>Edit Profile</h1>
                <br/>
                <form method='POST' action={idPage}>
                    <div className='row justify-content-center'>
                        <p>Name <input type='text' name='name' value={name} placeholder='Enter name'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Photo <input type='text' name='photo_url' value={photoUrl} placeholder='Enter URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Nationality <input type='text' name='nationality' value={nationality} placeholder='Enter nationality'/>
                        </p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                    </div>
                </form>
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
    );
  }
}

module.exports = Edit_Artist;