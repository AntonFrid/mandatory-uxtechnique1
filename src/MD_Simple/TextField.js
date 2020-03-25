import React from 'react';

import './TextField.css';

class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.inputOnClick = this.inputOnClick.bind(this);
    this.unFocusInput = this.unFocusInput.bind(this);

    this.state = { isFocused: false, isFull: false };
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.textInput) {
          this.inputOnClick();
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.textInput) {
          this.unFocusInput(e);
        }
      }
    })
  }

  inputOnClick() {
    if(!this.props.stateBool) return;

    this.refs.textInput.focus();

    this.setState({ isFocused: true });
    document.addEventListener('click', this.unFocusInput);
  }

  unFocusInput(e) {
    if(!this.props.stateBool) return;

    if(e.keyCode !== 9) {
      if(
        e.target === this.refs.textInput
        || e.target === this.refs.textInputOuter
        || e.target === this.refs.textInputLabel
      ) return;
    }

    if( this.refs.textInput.value.replace(/\s/g, '') !== '') {
      this.setState({ isFull: true });
    }
    else {
      this.refs.textInput.value.replace(/\s/g, '')
      this.setState({ isFull: false });
    }

    this.setState({ isFocused: false });
    document.removeEventListener('click', this.unFocusInput);
  }

  render() {
    return (
      <div
        ref='textInputOuter'
        onClick={ this.inputOnClick }
        className={ this.props.stateBool
          ? (this.state.isFocused ? 'outer-text-field-foc' :'outer-text-field')
          : 'outer-text-field-disabled'
        }
      >
        <label
          ref='textInputLabel'
          onClick={ this.inputOnClick }
          className={ this.props.stateBool
            ? (this.state.isFocused ? 'text-label-foc'
            : ( this.state.isFull ? 'text-label-full' : 'text-label' ))
            : 'text-label-disabled'
          }
        >Label</label>
        { this.props.stateBool
          ? <input
              ref='textInput'
              onClick={ this.inputOnClick }
              type='text'
              className='text-input'
              spellcheck="false"
            />
          : null}
        <div
          className={ this.props.stateBool
            ? (this.state.isFocused ? 'bottom-line' : 'bottom-line-hidden')
            : 'bottom-line-hidden'
          }
        >
        </div>
      </div>
    );
  }
}

export default TextField;
