import styled from 'styled-components'
import TextField from './form-components/TextField';
import Button from './form-components/Button';

const PanelWrapper = styled.div`
  margin : 0 auto;
  padding: 3rem;
  border : 1px #ccc solid;
`

const Panel = (props) => {
  let title = props.title || "Panel"
  return (
    <div>
      <PanelWrapper>
        {props.children}
      </PanelWrapper>
    </div>
  );
}


export default Panel