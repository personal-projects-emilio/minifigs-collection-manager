import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Route, Link } from 'react-router-dom';

import classes from './Frames.css';
import * as actions from '../../store/actions/minifigs';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import CircularProgress from '@material-ui/core/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Frame from '../Frame/Frame';



export class Frames extends Component {
    componentDidMount() {
        if(!this.props.minifigs){
            this.props.onInitMinifigs();
            this.props.onInitFrames();
        }
    }

    render() {
        let frames = <CircularProgress className={classes.Spinner} size={100} thickness={1.5} />;
        if (this.props.frames) {
            frames = Object.keys(this.props.frames).map(frame => {
                const selectFrame = this.props.location.pathname.replace('/frames/', '')
                return <Link to={"/frames/"+ frame} key={frame+"|link"}><RaisedButton label={frame}
                                     key={frame}
                                     style={{margin:6}}
                                     primary={selectFrame === frame}
                                     labelColor={selectFrame === frame ? "white": "rgb(0,0,0)"}/></Link>;
            });
        }

        return (
            <Aux>
                <div className={classes.Frames}>
                    {frames}
                </div>
                <Route path="/frames/:frame" component={Frame} />
                <Route path="/frames" exact render={() => <div className={classes.SelectFrame}><p>Select a frame</p></div>}/>
            </Aux>
            
        )
    }
}

const mapStateToProps = state => {
	return {
		minifigs: state.minifigs,
        error: state.error,
        frames: state.frames
	}
}

const mapDispatchToProps = dispatch => {
	return {
        onInitMinifigs: () => dispatch(actions.initMinifigs()),
        onInitFrames: () => dispatch(actions.initFrames())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Frames);