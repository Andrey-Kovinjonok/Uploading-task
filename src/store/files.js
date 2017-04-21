import { createAction, createReducer } from 'redux-act';

// Create an action creator (description is optional)
export const addUploadedFile = createAction(
  'add file to store after successful upload',
  ({ fileName, timeStamp }) => ({ fileName, timeStamp })
);

export const setUploadingServer = createAction(
  'add file to store after successful upload',
  (url) => (url)
);

const initialState = {
  uploadedFiles: [{ timeStamp: 'ttt', fileName: 'dssd' }],
  uploadingUrl: 'www.file.io'
  // uploadedFiles: [],
};

export default createReducer({
  [addUploadedFile]: (state, { fileName, timeStamp }) => (
    console.log('UPLOAD FILE IS ADDING', state, fileName, timeStamp), {
    ...state,
    uploadedFiles: [
      ...state.uploadedFiles,
      { fileName, timeStamp },
    ]
  }),

  [setUploadingServer]: (state, uploadingUrl) => (
    console.log('URL IS CHANGING', uploadingUrl), {
    ...state,
    uploadingUrl,
  }),
}, initialState);

