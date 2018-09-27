import React, {Component} from 'react';
import GalleryItem from '../GalleryItem/GalleryItem'
class GalleryList extends Component {
    render() {

        let photosMapArray = this.props.photos.map((photo, index) => {
            return(
                <GalleryItem
                    key={index} 
                    photo={photo}
                    lovePhoto={this.props.lovePhoto}
                    deletePhoto={this.props.deletePhoto}
                />
            )
        })

        return(
            <div>
                {photosMapArray}
            </div>
        )
    }
}

export default GalleryList;