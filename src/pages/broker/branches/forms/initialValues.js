import { object, string } from 'yup'

const initialBranch = {
  logo: '',
  streetNumber: '',
  streetName: '',
  city: '',
  parish: '',
  country: '',
  branchName: '',
}

const createBranchSchema = object().shape({
  logo: string().nullable(),
  branchName: string().required('Branch Name is required'),
  streetNumber: string().required('Street Number is required'),
  streetName: string().required('Street Name is required'),
  city: string().required('City is required'),
  parish: string().required('Parish/State is required'),
  country: string().required('Country is required'),
})

export { createBranchSchema, initialBranch }
