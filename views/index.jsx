var React = require('react');

class Index extends React.Component {
  render() {

    console.log("INSIDE REACT INDEX", this.props.artist );

    const artistName = this.props.artist.map((artists) => {
      return <li> {artists.name} </li>
    })

    // const ownersElements = this.props.owners.map((owner)=>{

    //   let linkPath = "/dog/new?owner_id="+owner.id;

    //   return (<li>
    //       {owner.id} : {owner.name} :
    //       <a href={linkPath}>create dog for {owner.name}</a>
    //     </li>);

    // });
    //<ul>
        //   {ownersElements}
        // </ul>


    return (
      <div>
        <h1>All Artists</h1>
        <ul> {artistName}</ul>
      </div>
    );
  }
}

module.exports = Index;