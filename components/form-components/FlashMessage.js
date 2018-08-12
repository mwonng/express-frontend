import styled from 'styled-components'
import { darken  } from 'polished'

const FlashContiner = styled.div`
  margin: 0;
  transition:
    opacity .5s linear,
    visibility .5s linear;

  &.hide,&.show{
    overflow: hidden;
  }

  &.hide {
    visibility: hidden;
    opacity: 0;
  }

  &.show {
    visibility: visible;
    opacity: 1;
  }

  &.hide > div {
    margin-top: -5rem;
    transition: margin-top .5s .5s;
  }
  &:hover {
    cursor: pointer;
  }
`;

const FlashMsgWrapper = styled.div`
  box-shadow: ${props => theme[props.theme].boxShadow};
  border-radius: 4px;
  padding: 1rem 1.5rem;
  margin: .5rem auto;
  background: ${props => theme[props.theme].bgColor};
  color: ${props => theme[props.theme].fontColor};
`;

const theme = {
  warning: {
    bgColor: '#fffaf3',
    fontColor: '#794b02',
    boxShadow: '0 0 0 1px #c9ba9b inset, 0 0 0 0 transparent'
  },
  success: {
    bgColor: '#fcfff5',
    fontColor: '#2c662d',
    boxShadow: '0 0 0 1px #a3c293 inset, 0 0 0 0 transparent'
  },
  error: {
    bgColor: '#fff6f6',
    fontColor: '#9f3a38',
    boxShadow: '0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent'
  }
};

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    const { type } = this.props
    this.state = {
      isShown: true,
      type
    }
    this.onShow = this.onShow.bind(this)
    this.onClose = this.onClose.bind(this);
    this.readyToFadeOut = this.readyToFadeOut.bind(this);
    this.onHold = this.onHold.bind(this);
  }

  componentDidMount() {
    this.onShow();
  }

  readyToFadeOut() {
    this.timer = setTimeout(
      () => this.onClose(),
      this.props.duration
    );
  }

  shouldComponentUpdate() {
    return true
  }

  onShow() {
    this.setState({ isShown: true }, () => this.readyToFadeOut() )
  }

  onClose() {
    this.setState({ isShown: false }, () => {
      this.props.callback()
    });
  }

  onHold() {
    clearTimeout(this.timer);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {isShown, type} = this.state;
    return (
      <FlashContiner className={isShown?'show':'hide'}>
        <FlashMsgWrapper
          color={this.props.color}
          onClick={this.props.onClick}
          theme={type}
          isShown={isShown}
          onShown={this.props.onShown}
          onMouseEnter={this.onHold}
          onMouseLeave={this.readyToFadeOut}
          >{this.props.text}
        </FlashMsgWrapper>
      </FlashContiner>
    );

  }
}

FlashMsgWrapper.defaultProps = {
  theme: 'error',
  isShown: true,
  duration: 3000
}

FlashMessage.defaultProps = {
  text: 'FlashMessage Component error'
}

export default FlashMessage;