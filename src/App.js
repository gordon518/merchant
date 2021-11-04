import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from './redux/actions'
import { notification } from 'antd';
import {get, post} from './fetch';
const dataProcess=require('./dataProcess');
import Merchant from './Merchant'
import style from './css/App.css'


class App extends Component {


    render() {
		const {list, isFetching, setFetch} = this.props;        
        
        let trList = list.map((item, index) =>         
            <tr bgcolor="white" key={item.id}>
                <td>
                    <Merchant item={item} index={index} />
                </td>
            </tr>
        );

		return (
            <table width="100%" border="0" cellSpacing="0" cellPadding="0" align="center" >
	        <tr>
		        <td align="center">
                    <table border="0" cellPadding="0" cellSpacing="0" width="710" >
                    <tr>
                        <td>Country:<select size="1" name="searchCountry" ref={searchCountry => this.searchCountry = searchCountry}>
                                      <option value="">All</option>
                                      <option value="USA">USA</option>
                                      <option value="CAN">CAN</option>
                                      <option value="INTL">INTL</option>
                                    </select>
                        </td>
                        <td>Merchant Name:<input type="text" name="searchMerchant" size="30" ref={searchMerchant => this.searchMerchant = searchMerchant} placeholder="Search by Merchant" /></td>
                        <td><input type="button" name="buttSearch" value="Search" onClick={this.onSearch} /></td>
                    </tr>
                    </table>
                </td>
	        </tr>
            {list.length>0 &&
	        <tr>
		        <td align="center">
                    <table border="0" cellPadding="0" cellSpacing="1" width="710" bgcolor="black">
                        {trList}
                    </table>
                </td>
            </tr>
            }
            </table>
		);
	}

    componentDidMount() {
		//this.props.setFetch(true);
        get('/getMerchants').then((response)=> {
			//this.props.setFetch(false);
            if(!response.err) {
                var ret=JSON.parse(response);
                this.props.setList(ret.rows);
			}
            else {
                console.log(response);
				notification['error']({message: response.err});
			}
		}).catch((error)=> {
			//this.props.setFetch(false);
			console.log(error);
			notification['error']({message: error});
		});
    }

    onSearch=e=>{
        //First spell param
        let country=this.searchCountry.value;
        let merchant=this.searchMerchant.value;
        let param="";
        if(country && country.length>0 && country!="All") {
            param="?country="+country;
        }
        if(merchant && merchant.length>0) {
            if(param.length>0) {
                param+="&merchant="+merchant;
            } else {
                param="?merchant="+merchant;
            }
        }
        let sRequest="/getMerchants"+param;
        //Second call api at back-end
        get(sRequest).then((response)=> {
			//this.props.setFetch(false);
            if(!response.err) {
                var ret=JSON.parse(response);
                this.props.setList(ret.rows);
			}
            else {
                console.log(response);
				notification['error']({message: response.err});
			}
		}).catch((error)=> {
			//this.props.setFetch(false);
			console.log(error);
			notification['error']({message: error});
		});
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
export default connect(mapStateToProps, mapDispatchToProps)(App)