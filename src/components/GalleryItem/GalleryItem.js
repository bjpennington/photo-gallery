import React, {Component} from 'react';
import './GalleryItem.css';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import {Favorite, Delete} from '@material-ui/icons';

const styles = {
    card: {
      maxWidth: 250,
      margin: 10,
      display: 'inline-block',
      float: 'left'
    },
    media: {
      height: 250,
    },
    actions: {
        margin: 'auto',
    }
  };

class GalleryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewDescription : true
        }
    }

    toggleView = () => {
        this.setState({
            viewDescription : !this.state.viewDescription
        })
    }

    handleClickForLove = () => {
        this.props.lovePhoto(this.props.photo._id, this.props.photo.likes);
    }

    handleClickForDelete = () => {
        this.props.deletePhoto(this.props.photo._id);
    }

    render() {

        let view;

        if(this.state.viewDescription) {
            view = (
                <CardMedia
                    onClick={this.toggleView}
                    className={this.props.classes.media}
                    image={this.props.photo.path}
                    title={this.props.photo.alt_text}
                />
            )
        }
        else {
            view = (
                <CardContent
                    onClick={this.toggleView}
                    className={this.props.classes.media}
                >
                    <Typography component="p">
                        {this.props.photo.description}
                    </Typography>
                </CardContent>
            )
        }

        return(
        <div>
            <Card className={this.props.classes.card}>
                {view}
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.photo.likes} people love this!
                </Typography>
              </CardContent>
              <CardActions className={this.props.classes.actions}>
                <Button onClick={this.handleClickForLove} size="small" color="primary">
                  <Favorite />
                </Button>
                <Button onClick={this.handleClickForDelete} size="small" color="primary">
                    <Delete />
                </Button>
              </CardActions>
            </Card>
          </div>
        )
    }

}

export default withStyles(styles)(GalleryItem);