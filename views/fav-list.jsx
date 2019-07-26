var React = require('react');

class FavList extends React.Component {
  render() {

    let favList = this.props.favList.map(fav => {

        return(
            <div className="artist-item col col-lg-3 col-sm-6">
                <div className="row artist-img-wrapper">
                    <img className="artist-img" src={fav.artwork}/>
                </div>
                <div className="info-wrapper text-center">

                    <p>{fav.title}</p><br />
                    <p>{fav.album}</p><br />
                </div>
            </div>
        )
    })


    return (
      <div>
        {favList}
      </div>
    );
  }
}
module.exports = FavList;