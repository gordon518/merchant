import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from './redux/actions'
import MerchantInfo from './MerchantInfo'

class Merchant extends Component {
    render() {
        const {item, index} = this.props;

        return (
            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
            <tr>
                <td width="150">
                    <img src={require('./css/'+item.pic+'.png')}/>
                </td>
                <td>
                    <MerchantInfo item={item} index={index} />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <hr/>
                </td>
            </tr>
            </table>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return{
        setList:bindActionCreators(actions.setList,dispatch),
		setFetch:bindActionCreators(actions.setFetch,dispatch),
    }
}

function mapStateToProps(state) {
    return{
        list: state.list,
        isFetching: state.isFetching,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Merchant)
