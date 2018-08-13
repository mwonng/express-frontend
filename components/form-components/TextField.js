import styled from 'styled-components'

const TextFieldTheme = {
  normal: {
    border: "rgba(81, 203, 238, 1)",
  },
  warning: {
    border: "rgba(204,102,102,0.8)"
  }
}

const StyledInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  color: #666;
  height: 2.5rem;
  padding: 5px 16px;
  box-shadow: none;
  border: 1px solid #DDDDDD;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  outline: none;
`

const InputWrapper = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  margin-bottom: 10px;
  > input:focus {
    box-shadow: 0 0 5px ${ props=> TextFieldTheme[props.theme].border };
    border: 1px solid ${ props=> TextFieldTheme[props.theme].border };
  }
`

const Label = styled.label`
  font-family: Lato;
  font-weight: bold;
  display: block;
  padding-bottom: 10px;
`



class TextField extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isValidate: true
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.props.id === "password") {
      this.props.onKeyPressEnter()
    }
  }

  _onChange = (e) => {
    this.props.onChange(e);
    this._handleValidate(this.props.validate, e.target.value);
  }

  _handleValidate = (validateFunction, value) => {
    if (validateFunction) {
      return this.setState({
        isValidate: validateFunction(value) ? true : false
      });
    }
    if (this.props.isMatch !== undefined) {
      return this.setState({
        isValidate: this.props.isMatch
      }, () => {
        return this.setState({
          isValidate: this.props.isMatch
        });
      });
    }
    return this.setState({
      isValidate: true
    });
  }

  _onFocus = (e) => {
    this._handleValidate(this.props.validate, e.target.value);
    this.props.onFocus;
  }

  render(){
    let {isValidate} = this.state;
    let theme = isValidate? 'normal':'warning';
    return (
      <InputWrapper theme={theme}>
        <Label>{this.props.label}</Label>
        <StyledInput
          id={this.props.id}
          className={this.props.class}
          onChange={this._onChange}
          type={this.props.password? "password":"text"}
          onKeyPress={this._handleKeyPress}
          onFocus={this._onFocus}
          isValidate={this.state.isValidate}
          >
        </StyledInput>
      </InputWrapper>
    )
  }
}

export default TextField