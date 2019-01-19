import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Trunk extends Component {
    render() {
        let trunk = null;
        if(this.props.trunks){
            let trunkArray = this.props.trunks[this.props.trunk];
            console.log(trunkArray);
            trunk = trunkArray.map(el => (
                <div key={el.name + el.ref +'trunk'}>{el.ref +': '+el.name}</div>
            ));
        }
        return <div>{trunk}</div>
    }
}

const mapStateToProps = state => ({
    trunks: state.minifigs.trunks,
    error: state.minifigs.error
})

export default connect(mapStateToProps, null)(Trunk)