import React, { Component } from 'react'

class Test extends Component {
  componentDidMount(){
    console.log('Component did mount');
  }
  componentWillMount(){
    console.log('Component Will mount');
  }
  componentDidUpdate(){
    console.log('did update');
  }
  componentWillUpdate(){
    console.log('will update');
  }
  render() {
    return (
      <div>
        <h1>Test Component</h1>
      </div>
    )
  }
}
export default Test;