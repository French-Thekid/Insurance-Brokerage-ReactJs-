import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { FormControl, Colours, Core, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_NOTE } from '../mutations'
import { LISTNOTES } from '../queries'
import { sections } from './initialValues'
import { Logger } from '../../../../../../utils'

export default function CreateNote({ close }) {
  const {
    params: { accountId },
  } = useRouteMatch()

  const { id, section, content } =
    JSON.parse(localStorage.getItem('activeNote')) || {}
  const [updateNote, { loading: Attaching, error: NoteError }] = useMutation(
    UPDATE_NOTE,
    {
      refetchQueries: () => [
        {
          query: LISTNOTES,
          variables: { accountId: parseInt(accountId) },
        },
      ],
    }
  )
  return (
    <Formik
      initialValues={{
        noteContent: content,
        noteSection: section,
      }}
      validationSchema={object().shape({
        noteSection: string('Select a valid Note Section').required(
          'Note Section is required'
        ),
        noteContent: string('Enter a valid Note Content').required(
          'Note Content is required'
        ),
      })}
      onSubmit={({ noteContent, noteSection }, action) => {
        updateNote({
          variables: {
            id: id,
            accountId: parseInt(accountId),
            content: noteContent,
            section: noteSection,
          },
        })
          .then(() => {
            Logger('edit a note')
            close()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          touched,
          handleBlur,
          handleSubmit,
          errors,
        } = props
        return (
          <form
            id="editRoleForm"
            onSubmit={handleSubmit}
            css={`
              width: 500px;
              @media (max-width: 376px) {
                width: 300px;
              }
            `}
          >
            {Attaching && <Loading small />}
            {NoteError && (
              <Content.Alert
                returnAfter
                type="error"
                message="Failed to Update Note"
              />
            )}

            <FormControl.Select
              value={values.noteSection}
              groups={sections}
              label="Note Section"
              name="noteSection"
              handlechange={handleChange}
              onBlur={handleBlur}
            />
            <FormControl.Error
              name="noteSection"
              show={errors.noteSection && touched.noteSection}
              message={errors.noteSection}
            />
            <br />
            <FormControl.Input
              label="Note Details"
              id="noteContent"
              value={values.noteContent}
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Type Details here"
            />
            <FormControl.Error
              name="noteContent"
              show={errors.noteContent && touched.noteContent}
              message={errors.noteContent}
            />
            <Core.Button
              bgColour={Colours.green}
              type="submit"
              style={{ marginTop: '10px' }}
            >
              Update Note
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
