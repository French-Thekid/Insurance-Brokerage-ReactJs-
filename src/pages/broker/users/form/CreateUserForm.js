import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { /*useRouteMatch,*/ useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { LIST_BRANCHES } from '../../branches/forms/queries'
import { ASSIGN_USER_TO_ROLE } from '../../roles/forms/mutations'
import { CREATE_USER } from '../mutations'
import { LIST_USERS } from '../queries'
import { UserSchema, initialUser } from './initialValues'
import { Avatar, FormControl, Content, Loading } from 'components'
import { LIST_USERS as DashboardUSerList } from '../../home/queries'
import { Logger } from '../../../../utils'

function CreateUserForm({ formId, role, setRole }) {
  const history = useHistory()
  //Create Role have Users Mutation
  const [addUserRoles, { loading: loadRole, error: UserToRoleError }] =
    useMutation(ASSIGN_USER_TO_ROLE)

  const [createUser, { loading: loadUser, error: userError }] = useMutation(
    CREATE_USER,
    {
      onCompleted({ createUser }) {
        // Logger('create user')
        //Adding users to Role
        if (role)
          role.roles.map((roleID) =>
            //Execution of policy have insured for selected insured
            addUserRoles({
              variables: {
                userId: createUser.id,
                roleId: parseInt(roleID),
              },
            })
              .then(() => {
                setRole({ roles: [] })
              })
              .catch((e) => console.log(e))
          )
      },
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
        {
          query: DashboardUSerList,
        },
      ],
    }
  )

  //List Branches Query
  const {
    loading: isBranchsLoading,
    error: BranchErrors,
    data: BranchList,
  } = useQuery(LIST_BRANCHES)

  if (isBranchsLoading) return <Loading small />
  if (BranchErrors)
    return <Content.Alert type="error" message={'Failed to load Branchs'} />

  const { listBranches } = BranchList || {}
  const { data = [] } = listBranches || {}

  //Removing Users assignment to Role
  if (UserToRoleError)
    return (
      <Content.Alert type="error" message={'Failed to Add User from Role.'} />
    )

  if (userError)
    return <Content.Alert type="error" message={'Failed to create User.'} />

  const unsorted = data.map((item, index) => {
    return { name: item.branchName, id: item.id }
  })
  unsorted.sort()

  const BRANCHES = unsorted.map((item, index) => {
    return { value: item.name, label: item.name }
  })

  return (
    <Formik
      initialValues={initialUser}
      validationSchema={UserSchema}
      onSubmit={async (
        { email, firstName, lastName, position, avatar, branch },
        actions
      ) => {
        if (avatar) avatar = avatar.split(',')[1]
        let branchIdArray = unsorted
          .map((item, index) => {
            if (item.name === branch) return item.id
            return null
          })
          .filter((i, j) => i !== null)
        const branchId = branchIdArray[0]

        await createUser({
          variables: {
            user: {
              email,
              firstName,
              lastName,
              position,
              branchId,
              avatar,
            },
          },
        })
          .then(() => {
            Logger(`created a user ${firstName} ${lastName}`)
          })
          .catch((e) => {
            console.log(e)
          })
        history.push('/broker/users')
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
                grid-gap: 15px;
                justify-items: center;
              `}
            >
              {(userError || UserToRoleError) && (
                <Content.Alert
                  type="error"
                  returnAfter
                  message={'Failed to Create User'}
                />
              )}
              {(loadUser || loadRole) && <Loading small />}
              <Avatar
                height="50px"
                src={initialUser.avatar}
                onDone={({ base64 }) => {
                  setFieldValue('avatar', base64)
                }}
              />
              <br />
              <section
                css={`
                  width: 100%;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 20px;
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
                <FormControl.Error name="position" message={errors.position} />
              </div>
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
export default CreateUserForm
