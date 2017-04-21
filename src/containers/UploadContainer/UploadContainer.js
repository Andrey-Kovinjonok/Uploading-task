import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import { TextInput, FileUpload, Button } from '../../components';
import FileListContainer from '../FileListContainer/FileListContainer';
import NotifyContainer from '../NotifyContainer/NotifyContainer';
import apiActions from '../actions';
import { addUploadedFile, setUploadingServer } from '../../store/files.js';

console.log(addUploadedFile)

const FileUploadPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 500px;
  height: 500px;

  background-color: #e6ffff;

  @media (max-width: 568px) {
    width: 300px;
  }
`;

const InputBlock = styled.div`
  display: block;
  width: 100%;
  height: 25px;
`;

const FileUploadContainer =({
  fileListProp,
  uploadingUrl,
  onChangeUploadingServer,
  uploadFileToURL,
  setSelectedFiles,
  selectedFiles,
}) => (console.log(fileListProp),
  <FileUploadPanel >
    <InputBlock>
      <TextInput onChange={onChangeUploadingServer} defaultValue={uploadingUrl}/>

      <FileUpload onChange={(event) => setSelectedFiles(event.target.files)} />

      <Button onClick={uploadFileToURL}>
        UPLOAD
      </Button>
    </InputBlock>

    <FileListContainer {...fileListProp}/>
  </FileUploadPanel>
);

FileUploadContainer.propsTypes = {
  fileListProp: React.PropTypes.arrayOf(React.PropTypes.object),
  uploadingUrl: React.PropTypes.string,
};

FileUploadContainer.defaultProps = {
  fileListProp: [],
  uploadingUrl: '',
} 

const FileUploadContainerHOC = compose(
  connect(
    (store) => ({
      fileListProp: { files: store.files.uploadedFiles },
      uploadingUrl: store.files.uploadingUrl,
    }),
    dispatch => ({
      addUploadedFileToStore: (fileItem) => dispatch(addUploadedFile(fileItem)),
      setUploadingServerToStore: (url) => dispatch(setUploadingServer(url)),
      // ...bindActionCreators(uploadReduxActions, dispatch),
      // ...bindActionCreators(apiActions, dispatch),
    }),
    (stateProps, dispatchProps, parentProps) => (
      console.log(parentProps, dispatchProps,stateProps), {
      ...parentProps,
      ...dispatchProps,
      ...stateProps,
    }),
  ),
  // withProps
  // withState('uploadingUrl', 'setUploadingServer', 'www.file.io'),
  withState('selectedFiles', 'setSelectedFiles', []),

  withHandlers({
    onChangeUploadingServer: ({ setUploadingServerToStore }) => (event) => {
      const url = event.target.value || '';
      console.log('URL', url);
      setUploadingServerToStore(url);
    },

    uploadFileToURL: ({
      addUploadedFileToStore,
      uploadingUrl,
      setSelectedFiles,
      selectedFiles,
      onNotify,
      ...props
    }) => (file) => {
      console.log(apiActions)
      addUploadedFileToStore({ timeStamp: 'ttt', fileName: 'dssd' });

      onNotify({
        message: 'The Try to upload files.',
        level: 'info',
      });

      const sendFile = apiActions.sendFileToServer(uploadingUrl);
      const fileItem = {
        fileName: file.fileName,
        timeStamp: new Date(),
      }
      sendFile(selectedFiles)
        .then(result => {
          addUploadedFileToStore()
          setSelectedFiles([]);
          onNotify({
            message: 'File was uploaded.',
            level: 'success',
          });
        })
        .catch(error => {
          addUploadedFileToStore(),
          onNotify({
            message: 'Uploading aborted!',
            level: 'error',
          });
        })
    },
  }),

)(FileUploadContainer);

export default NotifyContainer(FileUploadContainerHOC);
