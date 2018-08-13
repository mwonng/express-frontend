import styled from 'styled-components'

const StyledContainer = styled.div`
    margin: 0 auto;
    padding: 2rem;
    max-width: 1280px;
    width: 100%;
`

const container = WrappedComponent => {
  // console.log('simpleHoc');
  return class Inheritance extends WrappedComponent {
    render() {
      return (
        <StyledContainer>
          <WrappedComponent {...this.props}/>
        </StyledContainer>
      )
    }
  }
}
export default container