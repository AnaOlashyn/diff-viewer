import React from 'react';
import './App.scss';
import { TreeList } from './TreeList';


export class App extends React.Component {

constructor(props){
  super(props);
  this.state = { leftList: {}, rightList: {}, display: [], display2level: [] }
  this.updateArray = this.updateArray.bind(this);
  this.displayChange = this.displayChange.bind(this);
  this.display2levelChange = this.display2levelChange.bind(this);
}

  componentDidMount() {
    this.getJson();
  }

  getJson() {
    let data = require('./example.json');
    this.setState({ leftList: data.left, rightList: data.right });
  }

  updateArray(arr, elem) {
    let inArray = arr.indexOf(elem) !== -1;
    let newState = [];
    if (inArray) { 
      newState = arr.filter(function (item) { return item !== elem });
    } else { 
      newState = newState.concat(arr, [elem]);
    }
    return newState;
  }

  displayChange(index) {
    let newState = this.updateArray(this.state.display, index);
    this.setState({ display: newState });
  }

  display2levelChange(index) {
    let newState = this.updateArray(this.state.display2level, index);
    this.setState({ display2level: newState });
  }

  render() {
    return (
      <div className="page">
        <div className="lists">
          <TreeList dataList={this.state.leftList}
            display={this.state.display}
            display2level={this.state.display2level}
            onChangeDisplay={this.displayChange}
            onChangeDisplay2Level={this.display2levelChange} />
          <TreeList dataList={this.state.rightList}
            display={this.state.display}
            display2level={this.state.display2level}
            onChangeDisplay={this.displayChange}
            onChangeDisplay2Level={this.display2levelChange}
          />
        </div>
      </div>
    )
  }
}