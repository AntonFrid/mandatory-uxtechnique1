import React from 'react';
import './App.css';

import TextField from './MD_Simple/TextField.js';
import Switch from './MD_Simple/Switch.js';
import Checkbox from './MD_Simple/Checkbox.js';
import Radio from './MD_Simple/Radio.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textField: true,
      switch: true,
      checkbox: true,
      radio: true
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if(this.state[e.target.name]) {
      this.setState({ [e.target.name]: false });
    }else {
      this.setState({ [e.target.name]: true });
    }
  }

  render() {
    return (
      <div className="App">
        <h2>State switches</h2>
        <div className='disable-container'>
          <button
            className={ this.state.textField ? 'button-on' : 'button-off'}
            onClick={ this.onClick }
            name='textField'>
            Text field
          </button>
          <button
            className={ this.state.switch ? 'button-on' : 'button-off'}
            onClick={ this.onClick }
            name='switch'>
            Switch
          </button>
          <button
            className={ this.state.checkbox ? 'button-on' : 'button-off'}
            onClick={ this.onClick }
            name='checkbox'>
            Checkbox
          </button>
          <button
            className={ this.state.radio ? 'button-on' : 'button-off'}
            onClick={ this.onClick }
            name='radio'>
            Radio
          </button>
        </div>
        <TextField stateBool={ this.state.textField }/>
        <Switch stateBool={ this.state.switch }/>
        <Checkbox stateBool={ this.state.checkbox } labelValue='Item 1'/>
        <Checkbox stateBool={ this.state.checkbox } labelValue='Item 2'/>
        <Radio stateBool={ this.state.radio } value='Radio 1' name='radios'/>
        <Radio stateBool={ this.state.radio } value='Radio 2' name='radios'/>
      </div>
    );
  }
}

export default App;
