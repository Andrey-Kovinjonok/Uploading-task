import styled from 'styled-components';
import { compose, pure } from 'recompose';

const TextInput = styled.input`
  background-color: #eee;
  flex: 1;
`;

export default compose(
  pure,
)(TextInput);
