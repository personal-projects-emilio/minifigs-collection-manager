import React, { Component } from 'react'
import {connect} from 'react-redux';

import classes from './Frames.css';
import * as actions from '../../store/actions/minifigs';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Frame from '../../components/Frame/Frame';
import RaisedButton from 'material-ui/RaisedButton';



export class Frames extends Component {
    componentDidMount() {
        if(!this.props.minifigs){
            this.props.onInitMinifigs();
            this.props.onInitFrames();
        }
    }


    render() {
        let frames = null;
        if (this.props.frames) {
            frames = Object.keys(this.props.frames).map(frame => {
                return <RaisedButton label={frame}
                                     key={frame}
                                     style={{margin:6}}
                                     primary={this.props.frame === frame}
                                     labelColor={(this.props.frame === frame) ? "white": "rgb(0,0,0)"}
                                     onClick={() => this.props.setFrame(frame)} />;
            });
        }
        
        let frame = <p className={classes.SelectP}>Select a frame</p>;
        let frameClasses = [classes.Frame];
        if (this.props.frames && this.props.minifigs && this.props.frame) {
            frame = this.props.frames[this.props.frame].map((minifig, i) => {
                const name = minifig.ref ? this.props.minifigs[minifig.ref].characterName : null;
                return <Frame key={this.props.frame + i}    
                              minifig={minifig.ref || null} 
                              set={minifig.set || null}   
                              name={name} />     
            });
            const backgroundClass = classes[this.props.frame.replace(/\d+|\s+/g, '')];
            frameClasses.push(backgroundClass);
        }

        return (
            <Aux>
                <div className={classes.Frames}>
                    {frames}
                </div>
                <div className={frameClasses.join(' ')}>
                    {frame}
                </div>
            </Aux>
            
        )
    }
}

const mapStateToProps = state => {
	return {
		minifigs: state.minifigs,
        error: state.error,
        frame: state.frameSelected,
        frames: state.frames
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onInitMinifigs: () => dispatch(actions.initMinifigs()),
        onInitFrames: () => dispatch(actions.initFrames()),
        setFrame: (frame) => dispatch(actions.setFrame(frame))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Frames);