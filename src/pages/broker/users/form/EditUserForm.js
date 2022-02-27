import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import { LIST_BRANCHES } from '../../branches/forms/queries'

import { UserSchema } from './initialValues'
import { Avatar, FormControl, Content, Loading } from 'components'
import { LIST_ROLES_UNDER_USERS } from '../../roles/forms/queries'
import { ASSIGN_USER_TO_ROLE } from '../../roles/forms/mutations'
import { EDIT_USER } from '../mutations'
import { READ_USER } from '../queries'
import { Logger } from '../../../../utils'

function EditUserForm({ formId, role, setRole }) {
  const history = useHistory()
  const match = useRouteMatch()
  const {
    params: { userId },
  } = match

  // Get the user details On load
  const {
    loading,
    error: userError,
    data: userData,
  } = useQuery(READ_USER, {
    variables: { id: userId },
  })

  //List Branches Query
  const {
    loading: isBranchsLoading,
    error: BranchErrors,
    data: BranchList,
  } = useQuery(LIST_BRANCHES)

  const { listBranches } = BranchList || {}
  const { data = [] } = listBranches || {}

  //Create Role have Users Mutation
  const [addUserRoles, { error: UserToRoleError }] = useMutation(
    ASSIGN_USER_TO_ROLE,
    {
      refetchQueries: () => [
        {
          query: LIST_ROLES_UNDER_USERS,
          variables: { userId },
        },
      ],
    }
  )

  const [updateUser, { loading: ProcessingUpdate, error }] = useMutation(
    EDIT_USER,
    {
      refetchQueries: () => [
        {
          query: READ_USER,
          variables: { id: userId },
        },
      ],
    }
  )
  if (ProcessingUpdate) return <Loading small />

  if (loading) return <Loading small />
  if (userError)
    return <Content.Alert type="error" message={'Failed To Load UserData.'} />

  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Duplicate or Invalid Email Address.'}
      />
    )

  //Checking User assignment to Role
  if (UserToRoleError)
    return (
      <Content.Alert type="error" message={'Failed to add User to Role.'} />
    )

  const { readUser: initialUser = {} } = userData || {}
  const { email, firstName, lastName, position, userBranch, avatar } =
    initialUser || {}
  const { branchName: branch } = userBranch || {}

  if (isBranchsLoading) return <Loading small />
  if (BranchErrors)
    return <Content.Alert type="error" message={'Failed to load Branchs'} />

  const unsorted = data.map((item, index) => {
    return { name: item.branchName, id: item.id }
  })
  unsorted.sort()

  const BRANCHES = unsorted.map((item, index) => {
    return { value: item.name, label: item.name }
  })

  return (
    <Formik
      initialValues={{
        email,
        firstName,
        lastName,
        position,
        branch,
        avatar,
      }}
      validationSchema={UserSchema}
      onSubmit={async (
        { email, firstName, lastName, position, branch, avatar },
        actions
      ) => {
        let base64Avatar = null
        if (avatar) base64Avatar = avatar.split(',')[1]
        let branchIdArray = unsorted
          .map((item, index) => {
            if (item.name === branch) return item.id
            return null
          })
          .filter((i, j) => i !== null)
        const branchId = branchIdArray[0]
        await updateUser({
          variables: {
            user: {
              id: userId,
              email,
              firstName,
              lastName,
              position,
              base64Avatar,
              branchId,
            },
          },
        })
          .then(() => {
            Logger(`updated a user ${firstName} ${lastName}`)
            console.log(role)
            if (role.roles.length === 0) {
              history.push(`/broker/users/view-user/${userId}`)
            }
          })
          .catch((e) => console.log(e))
        //Adding users to Role
        if (role)
          role.roles.map((roleId) =>
            //Execution of policy have insured for selected insured
            addUserRoles({
              variables: {
                userId,
                roleId: parseInt(roleId),
              },
            })
              .then(() => {
                setRole({ roles: [] })
                history.push(`/broker/users/view-user/${userId}`)
              })
              .catch((e) => console.log(e))
          )
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, setFieldValue, errors } =
          props
        const { firstName, lastName, position, email, branch } = values
        return (
          <>
            <form
              onSubmit={handleSubmit}
              id={formId}
              css={`
                width: 100%;
                display: grid;
                grid-gap: 25px;
                justify-items: center;
              `}
            >
              <Avatar
                height="50px"
                src={initialUser.avatar}
                onDone={({ base64 }) => {
                  setFieldValue('avatar', base64)
                }}
              />
              {console.log(errors)}
              <section
                css={`
                  width: 100%;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 40px;
                  @media (max-width: 769px) {
                    grid-template-columns: 1fr;
                  }
                `}
              >
                <section>
                  <FormControl.Input
                    label="First Name"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="eg. John"
                    data-testid="create-user-firstName"
                  />
                  <FormControl.Error
                    name="firstName"
                    message={errors.firstName}
                  />
                </section>
                <section>
                  <FormControl.Input
                    label="Last Name"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="eg. Doe"
                    data-testid="create-user-lastName"
                  />
                  <FormControl.Error
                    name="lastName"
                    message={errors.lastName}
                  />
                </section>
              </section>
              <section
                css={`
                  width: 100%;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 40px;
                  @media (max-width: 769px) {
                    grid-template-columns: 1fr;
                  }
                `}
              >
                <div
                  css={`
                    width: 100%;
                  `}
                >
                  <FormControl.Input
                    label="Email"
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    placeholder="eg. john.doe@gmail.com"
                    data-testid="create-user-email"
                  />
                  <FormControl.Error name="email" message={errors.email} />
                </div>
                <div
                  css={`
                    width: 100%;
                  `}
                >
                  <FormControl.Input
                    label="Position"
                    id="position"
                    type="text"
                    value={position}
                    onChange={handleChange}
                    placeholder="eg. Administrator"
                    data-testid="create-user-position"
                  />
                  <FormControl.Error
                    name="position"
                    message={errors.position}
                  />
                </div>
              </section>
              <div
                css={`
                  width: 100%;
                `}
              >
                <FormControl.Select
                  value={branch}
                  groups={BRANCHES}
                  label="Branch"
                  name="branch"
                  handlechange={handleChange}
                />
                <FormControl.Error name="branch" message={errors.branch} />
              </div>
            </form>
          </>
        )
      }}
    </Formik>
  )
}
export default EditUserForm
