import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
  mutation createNote($section: String!, $accountId: Int!, $content: String!) {
    createNote(
      note: { section: $section, accountId: $accountId, content: $content }
    ) {
      createdAt
    }
  }
`
export const UPDATE_NOTE = gql`
  mutation updateNote(
    $section: String!
    $id: Int!
    $accountId: Int!
    $content: String!
  ) {
    updateNote(
      note: {
        id: $id
        section: $section
        accountId: $accountId
        content: $content
      }
    ) {
      createdAt
    }
  }
`
export const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!, $accountId: Int!) {
    deleteNote(params: { id: $id, accountId: $accountId }) {
      message
    }
  }
`
