import { object, string } from 'yup'

let options = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
]

let initialLimit = {
  header: '',
  amount: '',
  thirdparty: '',
  description: '',
}

const createLimitSchema = object().shape({
  header: string('Invalid Input').required('Header is required.'),
  amount: string('Invalid Input').required('Amount is required.'),
  thirdparty: string('Invalid Input').required('Third Party is required.'),
  description: string('Invalid Input').required('Description is required.'),
})

export { options, initialLimit, createLimitSchema }
