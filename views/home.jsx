var React = require("react");
var Layout = require ('./layout')

class Home extends React.Component {

  render() {

     const name = this.props.list.map((artist,i)=>{
           return <a href = {`/artists/${artist.id}`}><li key = {i}> {artist.name} </li></a>
        })
    return (
     <Layout>
        <h1> ARTISTS </h1>
            <ol>
                {name}
            </ol>
    </Layout>

    );
  }
}

module.exports = Home;