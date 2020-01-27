import React, { Component } from 'react';

import ProgressBar from '../ProgressBar';
import Button from '../Button';

export class FileUploader extends Component {
  state = {
    isFileUploading: false,
    file: null,
    inputKey: Date.now(),
    uploadProgress: 0,
    dragover: false,
  }

  setFile = (e) => {
    const { disableDragover } = this;
    const file = e.currentTarget.files[0];

    this.setState({ file });
    disableDragover();
  }

  enableDragover = () => this.setState({ dragover: true })

  disableDragover = () => this.setState({ dragover: false })

  startUpload = () => {
    this.setState({ isFileUploading: true });
    this.setUploadProgress();
  }

  finishUpload = () => {
    this.setState({
      uploadProgress: 0,
      isFileUploading: false,
      file: null,
      inputKey: Date.now(),
    });
  }

  setUploadProgress = () => {
    const {
      finishUpload,
      setUploadProgress,
    } = this;

    const { uploadProgress } = this.state;

    if (uploadProgress >= 100) {
      return finishUpload();
    }

    if (uploadProgress < 100) {
      // DONT DO THIS AT HOME
      const randomProgress = Math.random() * 9 + 1;
      setTimeout(() => {
        this.setState({ uploadProgress: Math.min(100, uploadProgress + randomProgress) });
        setUploadProgress();
      }, 200);
    }
  }

  render() {
    const {
      dragover,
      isFileUploading,
      uploadProgress,
      file,
      inputKey,
    } = this.state;

    const {
      enableDragover,
      disableDragover,
      startUpload,
      setFile,
    } = this;

    return (
      <>
        <div
          className={`drop-zone drop-zone__wrapper${dragover ? ' drop-zone__dragover' : ''}`}
        >
          <input
            key={inputKey}
            type="file"
            className="drop-zone__input"
            onDragEnter={enableDragover}
            onDragLeave={disableDragover}
            onChange={setFile}
          />
          {
            file && (
              <div className="container__relative" style={{ zIndex: 5 }}>
                <img className="file-preview" src={URL.createObjectURL(file)} alt="" />
              </div>
            )
          }
          {
            isFileUploading && (
              <div className="container__relative">
                <ProgressBar className="drop-zone__progressbar" value={uploadProgress} />
              </div>
            )
          }
        </div>

        <Button
          disabled={file === null || isFileUploading}
          onClick={startUpload}
        >
          Upload
        </Button>
      </>
    )
  }
}
