import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Core, Account, Loading, Content, Notification } from 'components'
import DocumentsTable from './table'
import documentPlaceholder from 'assets/documentPlaceholder.svg'
import { useRouteMatch } from 'react-router-dom'
import { LIST_FILES } from './queries'
import { UPLOAD_FILE } from './mutations'
import { Logger } from '../../../../../utils'
import { ColourContext } from 'context'

function Documents() {
  const [docURL, setDocURL] = useState(null)
  const { Colours } = useContext(ColourContext)
  const [file, setFile] = useState({})
  const [fileName, setFileName] = useState('No file Chosen')
  const {
    params: { accountId },
  } = useRouteMatch()

  const [uploadFile, { loading: uploading }] = useMutation(UPLOAD_FILE, {
    refetchQueries: () => [
      {
        query: LIST_FILES,
        variables: { accountId: parseInt(accountId) },
      },
    ],
  })

  const { loading, error, data } = useQuery(LIST_FILES, {
    variables: { accountId: parseInt(accountId) },
  })

  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to Load Documents'} />

  //Extract data after it's loading
  const {
    listAccountFiles: { data: documentList },
  } = data || {}

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-columns: 355px 1fr;
        @media (min-width: 1366px) {
          grid-template-columns: 600px 1fr;
        }
        @media (max-width: 769px) {
          grid-template-columns: 1fr;
          order: -1;
        }
        grid-gap: 10px;
      `}
    >
      <div
        css={`
          height: calc(100% - 45px);
          border-radius: 5px;
        `}
      >
        {uploading && <Loading small />}
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 100px;
            margin-bottom: 10px;
          `}
        >
          <Account.FileChooser
            fileName={fileName}
            setFileName={setFileName}
            onDone={(file) => setFile(file)}
          />
          <Core.Button
            disabled={Object.keys(file).length === 0 ? true : false}
            onClick={async () => {
              const { name, base64: body } = file
              const totalBytes = file.file.size
              const sizeInMB = Math.ceil(totalBytes / 1000000)

              if (sizeInMB >= 5) {
                Notification(
                  {
                    title: 'File too large',
                    body: `"${file.file.name}" size is ${sizeInMB}mb and exceeds the maximum file upload size of 4.5mb`,
                    titleBackground: Colours.blue,
                    titleColour: Colours.foreground,
                  },
                  { autoClose: 20000 }
                )
              } else {
                await uploadFile({
                  variables: {
                    accountFile: {
                      accountId: parseInt(accountId),
                      file: {
                        name,
                        body,
                        description: '',
                      },
                    },
                  },
                })
                  .then(() => {
                    Logger('Upload a document')
                    setFileName('No File Choosen')
                  })
                  .catch((e) => console.log(e))
              }
            }}
            style={{
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              height: '37px',
            }}
            bgColour={Colours.green}
            height="100%"
          >
            Upload
          </Core.Button>
        </div>
        <div
          css={`
            height: 100%;
            width: 355px;
            @media (min-width: 1366px) {
              width: 600px;
            }
            @media (max-width: 1025px) {
              width: 100%;
            }
          `}
        >
          <DocumentsTable setDocURL={setDocURL} documentList={documentList} />
        </div>
      </div>
      <div
        css={`
          height: 100%;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
        `}
      >
        <DocumentPreviewer src={docURL} />
      </div>
    </div>
  )
}

export default Documents

function DocumentPreviewer({ src }) {
  const { Colours } = useContext(ColourContext)
  return src ? (
    <div
      css={`
        height: 100%;
      `}
    >
      <iframe
        src={src}
        title="Document Viewer"
        css={`
          width: 100%;
          height: 100%;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
        `}
      />
    </div>
  ) : (
    <div
      css={`
        display: grid;
        place-items: Center;
        height: 100%;
      `}
    >
      <div
        css={`
          display: grid;
          object-fit: cover;
          grid-template-rows: repeat(2, max-content);
          place-items: center;
          grid-gap: 30px;
        `}
      >
        <img height="150" src={documentPlaceholder} alt="Placeholder Pdf" />
        <Core.Text>Select a Document from table to Preview</Core.Text>
      </div>
    </div>
  )
}
