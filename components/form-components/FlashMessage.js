import styled, {keyframes} from 'styled-components'
import { darken  } from 'polished'

// const theme = (props) => props.type ;
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
}


class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: true,
      isFading: false
    }
  }
  componentDidMount() {
    this.timer = setTimeout(
      () => this.onClose(),
      this.props.duration
    );
  }

  onClose() {
    this.setState({isShown:false})
  }

  onHold() {
    // console.log("WHAT IS ON HOLDE");
    clearTimeout(this.timer);
  }

  resumeTimer() {

  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {isShown} = this.state
    return (
      <FlashContiner className={isShown?'show':'hide'}>
        <FlashMsgWrapper
          color={this.props.color}
          onClick={this.props.onClick}
          theme={this.props.type}
          isShown={isShown}
          onMouseEnter={this.onHold}
          onMouseLeave={this.resumeTimer}
          >{this.props.text}
        </FlashMsgWrapper>
      </FlashContiner>

    );
  }
}

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
`;

const FlashMsgWrapper = styled.div`
  box-shadow: ${props => theme[props.theme].boxShadow};
  border-radius: 4px;
  padding: 1rem 1.5rem;
  margin: .5rem auto;
  background: ${props => theme[props.theme].bgColor};
  color: ${props => theme[props.theme].fontColor};
`

FlashMsgWrapper.defaultProps = {
  theme: 'error',
  isShown: true,
  duration: 3000
}

FlashMessage.defaultProps = {
  text: 'no text passed'
}

export default FlashMessage;