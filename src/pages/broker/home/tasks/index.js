import React, { useContext } from 'react'
import 'styled-components/macro'
import { UserContext, ColourContext } from 'context'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Core, Icons, Loading, Content, FormControl } from 'components'
import defaulBackground from 'assets/taskDefault.png'
import { CREATE_TASK, UPDATE_TASK, REMOVE_TASK } from './mutations'
import { LIST_TASK } from './queries'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Logger } from '../../../../utils'

function Task(props) {
  const user = useContext(UserContext)
  const { Colours } = useContext(ColourContext)
  const { id } = user.loggedInUser || {}

  const {
    showNotificationTaskCreate,
    showNotificationTaskUpdating,
    showNotificationTaskDelete,
  } = props || {}

  const [createTask, { loading: creating }] = useMutation(CREATE_TASK, {
    refetchQueries: () => [
      {
        query: LIST_TASK,
        variables: { userId: id },
      },
    ],
  })
  const [updateTask, { loading: updating }] = useMutation(UPDATE_TASK, {
    refetchQueries: () => [
      {
        query: LIST_TASK,
        variables: { userId: id },
      },
    ],
  })
  const [deleteTask, { loading: deleting }] = useMutation(REMOVE_TASK, {
    refetchQueries: () => [
      {
        query: LIST_TASK,
        variables: { userId: id },
      },
    ],
  })

  const {
    loading,
    error,
    data: taskData,
  } = useQuery(LIST_TASK, {
    variables: { userId: id },
  })

  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to fetch Tasks'} />

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: 30px 1fr;
        grid-row-gap: 15px;
        height: calc(100% - 15px);
      `}
    >
      <Formik
        initialValues={{
          description: '',
        }}
        validationSchema={object().shape({
          description: string().required('Description is required.'),
        })}
        onSubmit={({ description }, { resetForm }) => {
          createTask({
            variables: { task: { description, userId: id, completed: 1 } },
          })
            .then(() => {
              resetForm({ description: '' })
              Logger('create task')
              showNotificationTaskCreate()
            })
            .catch((e) => {
              console.log(e)
            })
        }}
      >
        {(props) => {
          const { values, handleChange, isSubmitting, handleSubmit } = props
          return (
            <form onSubmit={handleSubmit}>
              <div
                css={`
                  display: grid;
                  grid-template-columns: 1fr 40px;
                  grid-column-gap: 10px;
                  align-items: end;
                  padding: 10px 0px;
                `}
              >
                <FormControl.Input
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Type Task Here.."
                />
                <Core.Button disable={isSubmitting} selfContained type="submit">
                  <Icons.AddRounded style={{ fontSize: '25px' }} />
                </Core.Button>
              </div>
            </form>
          )
        }}
      </Formik>

      <div
        css={`
          height: 100%;
          margin-top: 20px;
          overflow-y: auto;
        `}
      >
        {(creating || updating || deleting) && <Loading small />}
        {taskData.listUserTasks.data.length === 0 ? (
          <div
            css={`
              display: grid;
              place-items: center;
              width: 100%;
              height: 100%;
            `}
          >
            <img
              src={defaulBackground}
              alt="defaultImage"
              css={`
                height: 100px;
                width: 200px;
                @media screen and (min-width: 1440px) {
                  height: 300px;
                  width: 450px;
                }
              `}
            />
          </div>
        ) : (
          taskData.listUserTasks.data.map(
            ({ id: taskId, completed, description }, index) => {
              return (
                <div
                  key={index}
                  css={`
                    display: grid;
                    grid-template-columns: 20px 1fr 40px;
                    grid-column-gap: 10px;
                    align-items: start;
                    padding-bottom: 5px;
                    border-bottom: 0.5px solid ${Colours.border};
                    margin-bottom: 10px;
                    transition: ease-out 1s;
                  `}
                >
                  <FormControl.Checkbox
                    defaultChecked={completed === 0 ? true : false}
                    onClick={(event) => {
                      if (event.target.checked) {
                        updateTask({
                          variables: {
                            task: {
                              userId: id,
                              id: taskId,
                              completed: 0,
                            },
                          },
                        })
                          .then(() => {
                            showNotificationTaskUpdating()
                            Logger('update task')
                          })
                          .catch((e) => console.log(e))
                      } else {
                        updateTask({
                          variables: {
                            task: {
                              userId: id,
                              id: taskId,
                              completed: 1,
                            },
                          },
                        })
                          .then(() => {
                            showNotificationTaskUpdating()
                            Logger('update task')
                          })
                          .catch((e) => console.log(e))
                      }
                    }}
                  />
                  <p
                    css={`
                      text-decoration: ${completed === 0
                        ? 'line-through'
                        : 'none'};
                      color: ${Colours.text};
                      font-size: 13px;
                      transition: ease-out 1s;
                    `}
                  >
                    {description}
                  </p>
                  <section
                    css={`
                      &:hover {
                        cursor: pointer;
                      }
                    `}
                    onClick={() => {
                      deleteTask({
                        variables: { userId: id, id: taskId },
                      })
                        .then(() => {
                          console.log()
                          showNotificationTaskDelete()
                          Logger('delete task')
                        })
                        .catch((e) => console.log(e))
                    }}
                  >
                    <Icons.DeleteRounded style={{ color: Colours.red }} />
                  </section>
                </div>
              )
            }
          )
        )}
      </div>
    </div>
  )
}

export default Task
