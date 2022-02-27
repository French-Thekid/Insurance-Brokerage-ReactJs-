import gql from 'graphql-tag'

export const UPLOAD_FILE = gql`
  mutation uploadAccountFile($accountFile: UploadAccountFileInput!) {
    uploadAccountFile(accountFile: $accountFile) {
      id
      message
    }
  }
`
export const DELETE_FILE = gql`
  mutation deleteAccountFile($accountId: Int!, $fileId: String!) {
    deleteAccountFile(accountId: $accountId, fileId: $fileId) {
      message
    }
  }
`
