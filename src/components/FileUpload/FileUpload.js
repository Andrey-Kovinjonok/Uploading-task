import React from 'react';
import styled from 'styled-components';
// import { compose, pure, withProps } from 'recompose';

const FileUpload = styled.input`
  background-color: #eee;
`;

export default (props) => (<FileUpload type='file' {...props} />);
