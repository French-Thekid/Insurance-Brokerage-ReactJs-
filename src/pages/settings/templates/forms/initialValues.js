import { object, string, array } from 'yup'

const createTemplateSchema = object().shape({
  avatar: string(),
  headerContent: string().required('Title is required'),
  templateName: string(),
  body: array()
    .min(1)
    .required('Sections Required'),
  footerContent: string(),
})

export { createTemplateSchema }
