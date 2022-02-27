import { object, string } from 'yup'

const emailSchema = object().shape({
  cc: string(),
  subject: string().required('Email must have a subject!'),
  body: string(),
})

const InitalEmail = {
  sender: '',
  subject: '',
  body: '',
}

export { emailSchema, InitalEmail }
