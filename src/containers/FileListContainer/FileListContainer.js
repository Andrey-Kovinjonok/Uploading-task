import React from 'react';
import styled from 'styled-components';

const FileItem = styled.div`
  flex: 1;
  height: 20px;
  text-align: center;
  color: black;
`;

const FileList = styled.div`
  flex: 1 1 auto;
`;


export default class FileListContainer extends React.Component {
  static propTypes = {
    files: React.PropTypes.arrayOf(React.PropTypes.object),
  };

  static defaultProps = {
    files: [],
  }; 

  /*constructor(props){
    super(props);
  }*/

  /*shouldComponentUpdate(props, nextProps) {
    return (props.files.length !== nextProps.files.length);
  }*/

  renderFiles() {
    const { files } = this.props;
    return files.map(({ fileName, timeStamp }) => (
      <FileItem key={fileName + timeStamp }>
        <span>
          {timeStamp} 
        </span>
        -
        <span>
          fileName
        </span>
      </FileItem>
    ))
  }
  render() {
    console.log(this.props);
    return (
      <FileList>
        {this.renderFiles()}
      </FileList>
      );
  }
};
