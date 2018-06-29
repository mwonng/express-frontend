import styled from 'styled-components'

const ButtonWrapper = styled.button`
  background: ${props => props.color} ;
  color: #fff;
  font-size: 16px;
  padding: 10px 16px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0000ff;
  }
`

const Button = (props) => (
  <ButtonWrapper color={props.color} onClick={props.onClick}>{props.text}</ButtonWrapper>
)

export default Button