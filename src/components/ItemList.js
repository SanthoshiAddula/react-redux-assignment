import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import {bindActionCreators} from "redux";
// import Pagination from "react-js-pagination";
import Pagination from "./Pagination";

class ItemList extends Component {

    constructor() {
        super();

        // an example array of items to be paged
        // var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });

        this.state = {
            // exampleItems: exampleItems,
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }
componentWillMount(){
          this.props.itemsFetchData(); 



}
   
    onChangePage(pageOfItems) {
      // console.log('active page is '+ pageNumber);
      this.setState({ pageOfItems: pageOfItems });
    }

getItems(){
  console.log("getitems",this.props.data.items.length);
  if(this.props.data.items.length>0){
          return <div><ul>
             {this.props.data.items.map((item) => (
                    <li key={item.oclc}>
                        {item.title}
                    </li>
                ))}
            </ul>
             <Pagination items={this.props.data.items} onChangePage={this.onChangePage} /></div>
           }else{
            console.log("no items found");

           }
}
    render() {

        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }


        return (
          <div>
            { this.getItems() } 
          </div>
        );
    }
}

/*ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};*/

const mapStateToProps = (state) => {
  console.log("mapstate",state.items);
    return {
        data: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        activePage : 1
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchData: (url) => dispatch(itemsFetchData(url))
//     };
// };

function mapDispatchToProps(dispatch) {
    return bindActionCreators({itemsFetchData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
