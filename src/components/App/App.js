import React, { Component } from 'react';
import './App.css';
import GalleryForm from '../GalleryForm/GalleryForm';
import GalleryList from '../GalleryList/GalleryList';
import axios from 'axios';
import 'typeface-raleway';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photos : [],
      newPhoto : {
        path: '',
        description: ''
      }
    }
  }

  handleChangeFor = (propertyName) => {
    return (event) => {
      this.setState({
        newPhoto: {
          ...this.state.newPhoto,
          [propertyName]: event.target.value
        }
      })
    }
  }


  getPhotos = () => {
    axios.get('/gallery')
      .then(response => {
        this.setState({
          photos : response.data
        })
      })
      .catch(error => {
        console.log('Error from /gallery GET:', error);
      })
  }

  addPhoto = (event) => {
    event.preventDefault();
    axios.post('/gallery', this.state.newPhoto)
          .then(response => {
            this.getPhotos();
            this.setState({
              newPhoto: {
                path: '',
                description: ''
              }
            })
          })
          .catch(error => {
            console.log('Error from /gallery POST:', error);
          });
  }

  lovePhoto = (id, likesCount) => {
    axios.put(`/gallery/like/${id}`, {likes: likesCount})
      .then(response => {
        this.getPhotos();
      })
      .catch(error => {
        console.log('Error from /gallery/like PUT on id:', id, 'error:', error);
      });
  }

  deletePhoto = (id) => {
    axios.delete(`/gallery/${id}`)
          .then(response => {
            this.getPhotos();
          })
          .catch(error => {
            console.log('Error from /gallery DELETE on id:', id, 'error:', error);
          });
  }
 
  componentDidMount() {
    this.getPhotos();
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Gallery of my life</h1>
        </header>
        <GalleryForm 
          newPhoto={this.state.newPhoto}
          addPhoto={this.addPhoto}
          handleChangeFor={this.handleChangeFor}
        />
        <GalleryList
          lovePhoto={this.lovePhoto}
          deletePhoto={this.deletePhoto}
          photos={this.state.photos}
        />
      </div>
    );
  }
}

export default App;
