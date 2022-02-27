import React, { useState } from 'react'
import 'styled-components/macro'
import user from 'assets/user.png'

import { Core } from 'components'

function Avatar(props) {
  const [src, setSrc] = useState('')
  const { onDone = () => {}, height = '50px', shadow } = props
  const handleChange = (event) => {
    //Convert file listing to Array
    let files = Array.from(event.target.files)
    //Initalize empty file array
    let allFiles = []
    let reader = new FileReader()

    files.map((file) => {
      //Convert to Base 64
      reader.readAsDataURL(file)
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + 'kB',
          base64: reader.result,
          file: file,
        }
        allFiles.push(fileInfo)
        //Set source to current image
        setSrc(allFiles[0].base64)
        onDone(allFiles[0])
      }
      return file
    })
  }

  const FileGrabber = ({ height, disabled, ...rest }) => (
    <input
      type="file"
      css={`
        height: ${height};
        width: calc(${height} * 2);
        opacity: 0;
        z-index: 1;
        &:hover {
          cursor: pointer;
        }
      `}
      disabled={disabled ? disabled : false}
      onChange={handleChange}
      {...rest}
    />
  )

  let mode = localStorage.getItem('Theme') || ''

  return (
    <div
      css={`
        width: max-content;
        height: calc(${height} * 2);
        display: grid;
        grid-template-rows: ${height} 10px;
      `}
    >
      <img
        id="image"
        src={props.src ? (!src ? props.src : src) : src ? src : user}
        css={`
          height: calc(${height} * 2);
          width: calc(${height} * 2);
          border-radius: 50%;
          object-fit: cover;
          box-shadow: ${shadow && mode === 'dark'
            ? '0px 9px 11px 1px rgba(16,15,28,1)'
            : shadow && (mode === 'Light' || mode === '')
            ? '0px 9px 11px 1px rgba(151,151,194,1)'
            : 'none'};
        `}
        alt="Avatar Component"
      />
      <div
        css={`
          height: ${height};
          max-height: ${height};
          width: calc(${height} * 2);
          border-bottom-left-radius: calc(${height} * 2);
          border-bottom-right-radius: calc(${height} * 2);
          background: rgba(0, 30, 70, 0.5);
          display: inline-block;
          &:hover {
            cursor: pointer;
          }
          display: grid;
          align-items: center;
          justify-items: center;
          grid-template-rows: 10px 10px;
        `}
      >
        <FileGrabber id="file" height={height} disabled={props.disabled} />
        <Core.Text color="#fff">Upload</Core.Text>
      </div>
    </div>
  )
}

export default Avatar
