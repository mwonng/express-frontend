import styled from 'styled-components'
import TextField from './form-components/TextField';
import Button from './form-components/Button';

const PanelWrapper = styled.div`
  margin: 0 auto;
  padding: 2rem;
  border: 1px #ccc solid;
  width: 50%;
`

const Panel = (props) => {
  let title = props.title || "Panel"
  return (
    <div>
      <PanelWrapper>
        <h3>{title}</h3>
        {props.children}
      </PanelWrapper>
    </div>
  );
}


export default Panel