import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import FormModal from "./components/FormModal";

class MyFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favData: [],
      idx: 0,
      infoModal: [],
      show: false,
    };
  }
  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    let email = this.props.auth0.user.email;
    if (isAuthenticated) {
      await axios
        .get(`http://localhost:8000/favcolors/${email}`)
        .then((result) => {
          this.setState({
            favData: result.data[0].colors,
          });
        });
    }
  };
  handleDelete = async (idx) => {
    let id = this.state.favData[idx]._d;
    let email = this.props.auth0.user.email;
    await axios
      .delete(`http://localhost:8000/deletecolor/${email}/${id}`)
      .then((result) => {
        console.log(result.data);
      });
    this.componentDidMount();
    this.forceUpdate();
  };

  handleShow = (idx) => {
    this.setState({
      show: true,
      infoModal: this.state.favData[idx],
      idx: idx,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleUpdat = async (e) => {
    
    let id = this.state.idx;
    let email = this.props.auth0.user.email;
    let data = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
    };
    await axios
      .put(`http://localhost:8000/updatecolor/${email}/${id}`, data)
      .then((result) => {
        this.setState({
          favData: result.data,
        });
      });
    this.componentDidMount();
    this.forceUpdate();
  };
  render() {
    return (
      <div>
        <div className="allcolors">
          {this.state.favData.length>0 && this.state.favData.map((color, idx) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={color.imageUrl}
                  alt={color.title}
                />
                <Card.Body>
                  <Card.Title>{color.title}</Card.Title>

                  <Button
                    variant="danger"
                    onClick={() => {
                      this.handleDelete(idx);
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      this.handleShow(idx);
                    }}
                  >
                    update
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        {this.state.show && (
          <FormModal
            show={this.state.show}
            handleClose={this.handleClose}
            infoModal={this.state.infoModal}
            handleUpdat={this.handleUpdat}
          />
        )}
      </div>
    );
  }
}

export default withAuth0(MyFavorites);
