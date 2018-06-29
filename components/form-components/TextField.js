import styled from 'styled-components'

const StyledInput = styled.input`
  display: block;
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
  &:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
  }
`

const InputWrapper = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  margin-bottom: 10px;
`

const Label = styled.label`
  font-family: Lato;
  font-weight: bold;
  display: block;
  padding-bottom: 10px;
`

const TextField = (props) => (
    <InputWrapper>
      <Label>{props.label}</Label>
      <StyledInput
        id={props.id}
        className={props.class}
        onChange={props.onChange}
        >
      </StyledInput>
    </InputWrapper>
)

export default TextField