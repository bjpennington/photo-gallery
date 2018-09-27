import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import ReactFilestack from 'filestack-react';

class GalleryForm extends Component {

    // filePicker = () => {
    //     const client = require('filestack-js').init('A4AhXLfHkRsmJF4dKWbU2z');
    //     const options = {
    //         uploadInBackground: false,
    //         onUploadDone: showFileData
    //     };

    //     client.picker(options).open();

    // }

    viewResults = (results) => {
        console.log('filepicker results:', results);
        
    }

    render() {
        return(
            <form onSubmit={this.props.addPhoto}>
                <p>Add a photo:</p>
                <input type="text" placeholder="Photo URL" value={this.props.newPhoto.path} onChange={this.props.handleChangeFor('path')} />
                <input type="text" placeholder="Photo Description" value={this.props.newPhoto.description} onChange={this.props.handleChangeFor('description')} />
                <input type="submit" />
                <ReactFilestack
                    apikey={'A4AhXLfHkRsmJF4dKWbU2z'}
                    buttonText="Click me"
                    // buttonClass="classname"
                    // options={options}
                    onSuccess={this.viewResults(this.props.showFileData)}
                />
            </form>  
        )
    }
}

export default GalleryForm;