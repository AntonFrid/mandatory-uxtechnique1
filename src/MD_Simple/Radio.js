import React from 'react';

import './Radio.css';

class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isChecked: false, isFocused: false };

    this.unFocusRadio = this.unFocusRadio.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if(e.target.name === this.refs.radioInput.name) {
        if(!this.props.stateBool) return;

        if(!this.state.isFocused) {
          this.setState({ isFocused: true });
          document.addEventListener('click', this.unFocusRadio)
        }

        if(this.refs.radioInput.checked) {
          this.setState({ isChecked: true, isFocused: true });
        }
        else {
          this.setState({ isChecked: false, isFocused: false });
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.radioInput) {
          document.addEventListener('click', this.unFocusRadio);
          this.setState({ isFocused: true });
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.radioInput) {
          document.removeEventListener('click', this.unFocusRadio);
          this.setState({ isFocused: false });
        }
      }
    })
  }

  unFocusRadio(e) {
    if(
      e.target === this.refs.radioInput
    ) return;

    this.setState({ isFocused: false });
    document.removeEventListener('click', this.unFocusRadio);
  }

  render() {
    return (
      <label
        className={ this.props.stateBool ? 'radio-label' : 'radio-label-disabled' }
      >
        { this.props.value }
        <input
          tabIndex={ this.props.stateBool ? '0' : '-1' }
          ref='radioInput'
          className='radio-input'
          type='radio'
          name={ this.props.name }
        />
        <div
          id={ this.props.stateBool ? 'fake-radio' : null }
          className={ this.state.isFocused
            ? (this.state.isChecked ? 'fake-radio-checked-foc' : 'fake-radio-foc')
            : (this.state.isChecked ? 'fake-radio-checked' : 'fake-radio')}
        >
          <div className={ this.state.isChecked ? 'fake-radio-inner': 'fake-radio-inner-hidden' }></div>
        </div>
      </label>
    );
  }
}

export default Radio;
