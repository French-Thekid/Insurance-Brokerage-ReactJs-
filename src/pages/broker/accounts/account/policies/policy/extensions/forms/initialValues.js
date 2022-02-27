import { object, string } from 'yup'

let initialExtension = {
  name: '',
  type: '',
  limit: '',
  description: '',
}

const createExtensionSchema = object().shape({
  name: string('Invalid Input').required('Name is required.'),
  type: string('Invalid Input').required('Type is required.'),
  limit: string('Invalid Input').required('Limit is required.'),
  description: string('Invalid Input').required('Description is required.'),
})

export { initialExtension, createExtensionSchema }
