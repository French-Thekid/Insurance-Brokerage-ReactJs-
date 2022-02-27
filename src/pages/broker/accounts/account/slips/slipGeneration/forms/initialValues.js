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
  subPremise: '',
  premise: '',
  thoroughfare: '',
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

const createInsurerSchema = object().shape({
  email: string()
    .email('Invalid Email')
    .required('Email is required'),
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  company: string().required('Company Name is required'),
  phoneNumber: string().required('Phone Number is required'),
  phoneCarrier: string(),
  phoneType: string(),
  phoneExtension: number(),
  streetNumber: string(),
  subPremise: string(),
  premise: string(),
  thoroughfare: string(),
  country: string(),
})

export { createInsurerSchema, initialInsurer, Carriers }
