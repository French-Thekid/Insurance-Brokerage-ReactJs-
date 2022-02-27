import React, { useContext } from 'react'
import { UserContext, ColourContext } from 'context'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_USER } from '../../broker/users/mutations'
import { ProfileSchema } from '../../broker/users/form/initialValues'
import { LOGGED_IN_USER } from 'context/queries'
import { Core, FormControl, Avatar, Loading } from 'components'
import { Logger } from '../../../utils'
import User from 'assets/user.png'

export default function Profile() {
  const { loggedInUser } = useContext(UserContext) || {}
  const {
    id,
    firstName = 'Loading',
    lastName = 'User',
    avatar,
    position,
    email,
  } = loggedInUser || {}
  const { Colours } = useContext(ColourContext)

  const [updateUser, { loading: updatingUser }] = useMutation(EDIT_USER, {
    refetchQueries: () => [
      {
        query: LOGGED_IN_USER,
      },
    ],
  })

  return (
    <div
      css={`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: 100%;
        border-radius: 5px;
        background: ${Colours.profileBackground};
      `}
    >
      <Formik
        initialValues={{
          avatar: avatar,
          firstName: firstName,
          lastName: lastName,
          position: position,
          email: email,
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (
          { email, firstName, lastName, position, avatar },
          actions
        ) => {
          let base64Avatar = ''
          if (avatar) base64Avatar = avatar.split(',')[1]
          await updateUser({
            variables: {
              user: {
                id,
                email,
                firstName,
                lastName,
                position,
                base64Avatar,
              },
            },
          })
            .then(() => {
              Logger(`updated personal account detail`)
            })
            .catch((e) => console.log(e))
        }}
      >
        {(props) => {
          const {
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            handleBlur,
          } = props
          const { firstName, lastName, position, email } = values
          return (
            <>
              {updatingUser && <Loading small />}
              {console.log(errors)}
              <form
                onSubmit={handleSubmit}
                css={`
                  display: grid;
                  height: 100%;
                  grid-gap: 50px;
                  grid-template-columns: max-content 1fr;
                  justify-items: center;
                  align-items: center;
                  @media (max-width: 999px) {
                    grid-template-columns: 1fr;
                    align-items: center;
                    height: 100%;
                  }
                `}
              >
                <div
                  css={`
                    height: max-content;
                    width: max-content;
                    display: grid;
                    justify-items: Center;
                    padding: 0px 20px 0px 20px;
                  `}
                >
                  <h4
                    css={`
                      padding: 0px;
                      margin: 0px;
                      margin-bottom: 20px;
                      color: ${Colours.text};
                    `}
                  >
                    Basic Information
                  </h4>
                  <Avatar
                    height="100px"
                    src={avatar && avatar[0] !== 'a' ? avatar : User}
                    onDone={({ base64 }) => {
                      setFieldValue('avatar', base64)
                    }}
                  />
                  <Core.Button
                    style={{
                      width: '150px',
                      margin: '0px',
                      marginTop: '20px',
                    }}
                    bgColour={Colours.orange}
                    type="button"
                    action="READ"
                    // onClick={() => toggleChangePassword()}
                  >
                    Change Password
                  </Core.Button>
                </div>
                <div
                  css={`
                    border-left: 1px solid ${Colours.border};
                    padding-left: 50px;
                    @media (max-width: 999px) {
                      border-left: none;
                      border-top: 2px solid ${Colours.border};
                      padding-left: 0px;
                      padding-top: 0px;
                    }
                    height: max-content;
                    width: max-content;
                    display: grid;
                    grid-gap: 30px;
                  `}
                >
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      grid-gap: 20px;
                      justify-items: center;
                      @media (max-width: 769px) {
                        grid-template-columns: 1fr;
                      }
                    `}
                  >
                    <FormControl.Section>
                      <FormControl.Input
                        id="firstName"
                        onBlur={handleBlur}
                        value={firstName}
                        onChange={handleChange}
                        label="First Name"
                      />
                      <FormControl.Error
                        show={errors.firstName && touched.firstName}
                        message={errors.firstName}
                      />
                    </FormControl.Section>
                    <FormControl.Section>
                      <FormControl.Input
                        id="lastName"
                        onBlur={handleBlur}
                        value={lastName}
                        onChange={handleChange}
                        label="Last Name"
                      />
                      <FormControl.Error
                        show={errors.lastName && touched.lastName}
                        message={errors.lastName}
                      />
                    </FormControl.Section>
                  </div>
                  <FormControl.Section>
                    <FormControl.Input
                      id="email"
                      onBlur={handleBlur}
                      label="Email"
                      value={email}
                      onChange={handleChange}
                    />
                    <FormControl.Error
                      show={errors.email && touched.email}
                      message={errors.email}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="position"
                      onBlur={handleBlur}
                      label="Position"
                      value={position}
                      onChange={handleChange}
                    />
                    <FormControl.Error
                      show={errors.position && touched.position}
                      message={errors.position}
                    />
                  </FormControl.Section>
                  <div
                    css={`
                      width: 100%;
                      @media (max-width: 376px) {
                        padding-bottom: 10px;
                      }
                    `}
                  >
                    <Core.Button
                      style={{ width: '150px', float: 'right' }}
                      type="submit"
                      id="submit"
                      data-testid="update-user-submit"
                      action="READ"
                    >
                      Save
                    </Core.Button>
                  </div>
                </div>
              </form>
            </>
          )
        }}
      </Formik>
    </div>
  )
}
