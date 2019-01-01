import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/minifigs';

export class Trunk extends Component {

    render() {
        
        return <div>test</div>
    }
}

const mapStateToProps = state => ({
    trunks: state.trunks,
    error: state.error
})

const mapDispatchToProps = dispatch => {
	return {
        fetchData: () => dispatch(actions.fetchData())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Trunk)