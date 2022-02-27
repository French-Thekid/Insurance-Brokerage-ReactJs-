import { object, string } from 'yup'

const UserSchema = object().shape({
  avatar: string().nullable(),
  firstName: string().required('First name is required!'),
  lastName: string().required('Last name is required!'),
  email: string().email('Email must be valid').required('Email is required'),
  position: string().required('Position is required'),
  branch: string().required('Branch is required'),
  branchId: string(),
})
const ProfileSchema = object().shape({
  avatar: string().nullable(''),
  firstName: string().required('First name is required!'),
  lastName: string().required('Last name is required!'),
  email: string().email('Email must be valid').required('Email is required'),
  position: string().required('Position is required'),
})
const initialUser = {
  avatar: '',
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  branch: '',
  branchId: '',
}

export { initialUser, ProfileSchema, UserSchema }
