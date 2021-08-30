import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "./AllDataAPI.css";

class AllDataAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorsArray: [],
    };
  }

  componentDidMount = () => {
    const { user, isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      let url = `${process.env.REACT_APP_SERVER}/colors`;
      axios.get("http://localhost:8000/colors").then((result) => {
        this.setState({
          colorsArray: result.data.flowerslist,
        });
      });
    }
  };

  addToFav = (idx) => {
    let data={
        name:this.state.colorsArray[idx].name,photo:this.state.colorsArray[idx].photo
    }
    let email=this.props.auth0.user.email;
    axios.post(`http://localhost:8000/addtofav/${email}`,data).then(result=>{
        console.log(result.data)
    })
  };
  render() {
    return (
      <div>
        <h1>All Data from the API</h1>
        <h3>Select your favorites :)</h3>
        <div className="allcolors">
          {this.state.colorsArray.length>0 && this.state.colorsArray.map((color, idx) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={color.photo} alt={color.name} />
                <Card.Body>
                  <Card.Title>{color.name}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.addToFav(idx);
                    }}
                  >
                    {" "}
                    Add To Fav
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth0(AllDataAPI);
