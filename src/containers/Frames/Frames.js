import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Route, Link } from 'react-router-dom';
import classes from './Frames.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Frame from './Frame/Frame';



export class Frames extends Component {
    componentDidUpdate() {
        let selectFrame = null;
        // If this is not '/frames' we take the path
        if (!this.props.match.isExact) {
            selectFrame = this.props.location.pathname.replace('/frames/', '')
        }
        // If it is not one of the frames we push '/frames'
        if (this.props.frames && selectFrame  && Object.keys(this.props.frames).map(frame => frame).indexOf(selectFrame) === -1){
            this.props.history.push('/frames');
        }
    }
    render() {
        let frames = <CircularProgress className={classes.Spinner} size={100} thickness={1.5} />;
        const selectFrame = this.props.location.pathname.replace('/frames/', '')
        if (this.props.frames) {
            frames = Object.keys(this.props.frames).map(frame => (
                <Link to={"/frames/"+ frame} key={frame+"|link"}>
                    <Button key={frame}
                            style={{margin:6}}
                            classes={{disabled: classes.Disabled}}
                            disabled={selectFrame === frame}
                            color={selectFrame === frame ? "primary": "default"}
                            variant="contained">{frame}</Button>
                </Link>
            ));
        }

        return (
            <React.Fragment>
                <div className={classes.Frames}>
                    {frames}
                </div>
                <Route path="/frames/:frame" component={Frame} />
                <Route path="/frames" exact render={() => <div className={classes.SelectFrame}><p>Select a frame</p></div>}/>
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => ({
    minifigs: state.minifigs.minifigs,
    error: state.minifigs.error,
    frames: state.minifigs.frames
})

export default connect(mapStateToProps, null)(Frames);