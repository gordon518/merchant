import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from './redux/actions'
import style from './css/App.css'

class MerchantInfo extends Component {
    render() {
        const {item, index, originalList} = this.props;

        return (
            <table border="0" cellPadding="0" cellSpacing="0" width="100%">
            <tr>
                <td colSpan="2" className={style.bigFont}>{item.name}</td>
            </tr>
            <tr>
                <td width="300">{item.mode}</td>
                <td>Country: {item.country}</td>
            </tr>
            <tr>
                <td colSpan="2">Price: ${item.price1}-${item.price2}</td>
            </tr>
            <tr>
                <td colSpan="2">website: <a href={item.website} target="_blank">{item.website}</a></td>
            </tr>
            </table>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(MerchantInfo)
