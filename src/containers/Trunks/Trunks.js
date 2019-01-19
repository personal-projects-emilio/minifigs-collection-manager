import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions';
import classes from './Trunks.css';


import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';
import Trunk from './Trunk/Trunk';


export class Trunks extends Component {
    state = {
        expanded: null,
    }

    componentDidMount() {
        if (!this.props.match.isExact) {
            this.props.history.push('/trunks');
        }
    }

    handleChange = panel => (_event, expanded) => {
        this.setState({
            expanded: expanded ? panel : null,
        });
    };

    render() {
        let trunks = this.props.error ? <p>Trunks can't be loaded!</p> : <CircularProgress className={classes.Spinner} size={200} thickness={1.5} />;
        if (this.props.trunks) {
            trunks = Object.keys(this.props.trunks).map(trunk => (
                <ExpansionPanel key={trunk} expanded={this.state.expanded === trunk} onChange={this.handleChange(trunk)}>
                    <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
                        {trunk}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Trunk trunk={trunk}></Trunk>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ));
        }
        return <div className={classes.Trunks}>{trunks}</div>
    }
}

const mapStateToProps = state => ({
    trunks: state.minifigs.trunks,
    error: state.minifigs.error
})

// const mapDispatchToProps = dispatch => {
// 	return {
// 	}
// }
export default connect(mapStateToProps, null)(Trunks)