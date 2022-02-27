import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

export default function FileAttachmentChooser({ onDone, id }) {
  const { Colours } = useContext(ColourContext)
  const handleChange = (event) => {
    // get the files
    let files = event.target.files

    // Process each selected file
    var allFiles = []
    for (var index = 0; index < files.length; index++) {
      let file = files[index]

      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        }

        // Push it to the state
        allFiles.push(fileInfo)

        // If all files have been proceed
        if (allFiles.length === files.length) {
          // Apply Callback function
          onDone(allFiles)
        }
      } // reader.onload
    } // endFor
  }
  return (
    <div
      css={`
        border-radius: 2px;
        height: 23px;
        border: 1px solid ${Colours.border};
        display: none;
      `}
    >
      <input
        css={`
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
          display: none;
        `}
        id={id}
        type="file"
        name="file"
        multiple
        onChange={handleChange}
      />
    </div>
  )
}
