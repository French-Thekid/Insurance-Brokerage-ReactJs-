import { object, string, number } from 'yup'

const initialInsurer = {
  email: '',
  avatar: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  phoneCarrier: '',
  phoneType: '',
  phoneExtension: '',
  streetNumber: '',
  streetName: '',
  city: '',
  parish: '',
  country: '',
  company: '',
}

let Carriers = [
  {
    label: 'Digicel',
    value: 'Digicel',
  },
  {
    label: 'Flow',
    value: 'Flow',
  },
]

const types = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Office', value: 'Office' },
  { label: 'Fixed Line', value: 'Fixed Line' },
  { label: 'Cell', value: 'Cell' },
  { label: 'Home', value: 'Home' },
]

const createInsurerSchema = object().shape({
  email: string().email('Invalid Email').required('Email is required'),
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  company: string().required('Company Name is required'),
  phoneNumber: string()
    .required('Phone Number is required')
    .test(
      'len',
      '10 digits Required',
      (val = '') =>
        val.replace(/\s/g, '').replace('(', '').replace(')', '-').length === 12
    ),
  phoneCarrier: string(),
  phoneType: string(),
  phoneExtension: number(),
  streetNumber: string(),
  subPremise: string(),
  premise: string(),
  thoroughfare: string(),
  country: string(),
})

export { createInsurerSchema, types, initialInsurer, Carriers }
