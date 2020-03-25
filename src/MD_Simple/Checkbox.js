import React from 'react';

import './Checkbox.css';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checked: false, isFocused: false };

    this.inputOnClick = this.inputOnClick.bind(this);
    this.unFocusCheck = this.unFocusCheck.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.checkInput) {
          document.addEventListener('click', this.unFocusCheck);
          this.setState({ isFocused: true });
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.checkInput) {
          document.removeEventListener('click', this.unFocusCheck);
          this.setState({ isFocused: false });
        }
      }
    })
  }

  inputOnClick() {
    if(!this.state.isFocused) {
      this.setState({ isFocused: true });
      document.addEventListener('click', this.unFocusCheck);
    }

    if(this.state.checked) {
      this.setState({ checked: false});
    }
    else {
      this.setState({ checked: true});
    }
  }

  unFocusCheck(e) {
    if(
      e.target === this.refs.checkLabel
      || e.target === this.refs.checkInput
    ) return;

    this.setState({ isFocused: false });
    document.removeEventListener('click', this.unFocusCheck);
  }

  render() {
    return (
      <label
        ref='checkLabel'
        className={ this.props.stateBool ? 'check-label' : 'check-label-disable' }
      >
        { this.props.labelValue }
        <input
          tabIndex={ this.props.stateBool ? '0' : '-1'}
          ref='checkInput'
          className='check-input'
          onClick={ this.props.stateBool ? this.inputOnClick : null }
          type='checkbox'
        />
        <div
          id={ this.props.stateBool ? 'fake' : null }
          className={ this.state.isFocused
            ? (this.state.checked ? 'fake-checked-foc' : 'fake-foc')
            : (this.state.checked ? 'fake-checked' : 'fake')
          }
        >
          { this.state.checked ? '✓' : null}
        </div>
      </label>
    );
  }
}

export default Checkbox;
