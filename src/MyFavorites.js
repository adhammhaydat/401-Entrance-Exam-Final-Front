import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import UpdateForm from './components/UpdateForm';

class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favColorArray: [],
      email: '',
      index : 0,
      selectedObj : {},
      show : false,
    }
  }

  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {

      let url = `${process.env.REACT_APP_SERVER}/favcolors/${user.email}`;

      let resData = await axios.get(url);
      this.setState({
        favColorArray: resData.data,
        email: user.email,
      })

    }
  }

  deleteColor = async (index) =>{
    let url = `${process.env.REACT_APP_SERVER}/deletecolor/${this.state.email}?index=${index}`;
    let resData = await axios.delete(url);
    this.setState({
      favColorArray: resData.data,
    })
  }

  showUpdateForm = (index) =>{
    this.setState({
      show : true,
      index : index,
      selectedObj : {
        title : this.state.favColorArray[index].title,
        imageUrl : this.state.favColorArray[index].imageUrl,
      }
    })
  }

  handleClose =()=>{
    this.setState({
      show : false,
    })
  }
  
  handleUpdate = async (event) =>{
    event.preventDefault();
    this.setState({
      show : false,
    })

    let updatedObj = {
      title : event.target.title.value,
      imageUrl : event.target.imageUrl.value
    }
    let url = `${process.env.REACT_APP_SERVER}/updatecolor/${this.state.email}?index=${this.state.index}`;
    let resData = await axios.put(url , updatedObj);
    this.setState({
      favColorArray: resData.data,
    })
  }


  render() {
    return (
      <>
          <UpdateForm show = {this.state.show}
          selectedObj = {this.state.selectedObj}
          handleClose = {this.handleClose}
          handleUpdate = {this.handleUpdate}
          />


        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        <div className='favscolorcards'>
          {this.state.favColorArray.map((color, index) => {
            return (

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={color.imageUrl} alt ={color.title} />
                <Card.Body>
                  <Card.Title>{color.title}</Card.Title>
                  <Button variant="warning" onClick = {()=>{this.showUpdateForm(index)}} > Update</Button>
                  <Button variant="danger" onClick = {()=>{this.deleteColor(index)}} >Delete</Button>
                </Card.Body>
              </Card>
            )
          })}
        </div>



      </>
    )
  }
}

export default withAuth0(MyFavorites);

