import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Frame.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import FrameMinifig from '../../components/FrameMinifig/FrameMinifig';

export class Frame extends Component {

    componentDidUpdate () {
            // If the parameter isn't a frame we redirect to /frames
            if (this.props.frames && this.props.match.params.frame){
                if( Object.keys(this.props.frames).map(frame => frame).indexOf(this.props.match.params.frame) === -1) {
                    this.props.history.push('/frames');
                }
                if (!this.props.match.isExact) {
                    this.props.history.push(this.props.match.url);
                }
            } 
    }


    render() {
        let frame = <CircularProgress className={classes.Spinner} size={200} thickness={1.5} />;
        let frameClasses = [classes.Frame];
        const SelectedFrame = this.props.match.params.frame;
        
        // If we have a frame in the params, frames and minifigs we render the frame
        if (this.props.minifigs && this.props.frames[SelectedFrame]){
            frame = this.props.frames[SelectedFrame].map((minifig,i) => {
                const name = minifig.ref !== "" ? this.props.minifigs[minifig.ref].characterName : null        
                return <FrameMinifig key={SelectedFrame + i}    
                                     minifig={minifig.ref || null} 
                                     set={minifig.set || null}   
                                     name={name} />
            });
            const backgroundClass = classes[SelectedFrame.replace(/\d+|\s+/g, '')];
            frameClasses.push(backgroundClass);
        }

        return <div className={frameClasses.join(' ')}>{ frame }</div>;
    }
}

const mapStateToProps = state => {
	return {
        minifigs: state.minifigs,
        frames: state.frames
	}
}

export default connect(mapStateToProps, null)(Frame);
