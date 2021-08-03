import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import './AllDataAPI.css'


class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorsArray: []
        }
    }

    componentDidMount = async () => {
        const { user, isAuthenticated } = this.props.auth0;
        if (isAuthenticated) {
            let url = `${process.env.REACT_APP_SERVER}/allcolors`;
            let resData = await axios.get(url);
            this.setState({
                colorsArray: resData.data
            })
        }

    }

    addToFav = async (color) => {
        const { user, isAuthenticated } = this.props.auth0;
        let url = `${process.env.REACT_APP_SERVER}/addtofav/${user.email}`;
        await axios.post(url, color)
    }

    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                <div className='allcolors'>
                    {this.state.colorsArray.map((color, index) => {
                        return (

                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={color.imageUrl} alt={color.title} />
                                <Card.Body>
                                    <Card.Title>{color.title}</Card.Title>
                                    <Button variant="primary" onClick={() => { this.addToFav(color) }}> Add To Fav</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
