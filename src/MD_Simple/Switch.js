import React from 'react';

import './Switch.css';

class Switch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { switchActive: false, isFocused: false };

    this.switchOnClick = this.switchOnClick.bind(this);
    this.unFocusSwitch = this.unFocusSwitch.bind(this);
    this.spaceClick = this.spaceClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.switchDot) {
          this.setState({ isFocused: true });
          document.addEventListener('click', this.unFocusSwitch);
          document.addEventListener('keydown', this.spaceClick);
        }
      }
    })

    document.addEventListener('keydown', (e) => {
      if(e.keyCode === 9) {
        if(document.activeElement === this.refs.switchDot) {
          this.setState({ isFocused: false });
          document.removeEventListener('click', this.unFocusSwitch);
          document.removeEventListener('keydown', this.spaceClick);
        }
      }
    })
  }

  spaceClick(e) {
    if(!this.props.stateBool) return;

    if(
      e.target === this.refs.switchDot
      || e.target === this.refs.switch
      || e.target === this.refs.switchLine
      || e.target === this.refs.switchLineColor
    ) {
      if(e.keyCode === 32) this.switchOnClick()
    }
  }

  switchOnClick() {
    this.refs.switch.focus();

    this.setState({ isFocused: true });
    document.addEventListener('click', this.unFocusSwitch);
    document.addEventListener('keydown', this.spaceClick);

    if(this.state.switchActive) {
      this.setState({ switchActive: false });
    }
    else {
      this.setState({ switchActive: true });
    }
  }

  unFocusSwitch(e) {
    if(
      e.target === this.refs.switch
      || e.target === this.refs.switchDot
      || e.target === this.refs.switchLine
      || e.target === this.refs.switchLineColor
    ) return;

    this.setState({ isFocused: false });
    document.removeEventListener('click', this.unFocusSwitch);
    document.removeEventListener('keydown', this.spaceClick);
  }

  render() {
    return (
      <div
        ref='switch'
        onClick={ this.props.stateBool ? this.switchOnClick : null }
        className={this.props.stateBool ? 'switch-outer' : 'switch-outer-disabled'}
      >
        <div
          id={ this.props.stateBool
            ? (this.state.switchActive ? 'switch-dot-active' : 'switch-dot')
            : null 
          }
          tabIndex={ this.props.stateBool ? '0' : '-1'}
          ref='switchDot'
          className={ (this.state.isFocused && this.props.stateBool)
            ? ( this.state.switchActive ? 'switch-dot-active-foc' : 'switch-dot-foc' )
            : ( this.state.switchActive ? 'switch-dot-active' : 'switch-dot' )
          }
        >
        </div>
        <div ref='switchLine' className='switch-line'>
          <div ref='switchLineColor' className={ this.state.switchActive ? 'switch-line-color-active' : 'switch-line-color'}>
          </div>
        </div>
      </div>
    );
  }
}

export default Switch;
