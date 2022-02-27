import { object, string } from 'yup'

const renewSchema = object().shape({
  valueA: string(),
  valueB: string(),
  valueC: string(),
  premium: string(),
  branch: string(),
  startDate: string().required(),
  endDate: string().required(),
  DateSigned: string().required(),
  RenewalDate: string().required(),
  memo: string(),
})

const initialRenewal = {
  valueA: '',
  valueB: '',
  valueC: '',
  premium: '',
  branch: '',
  startDate: '',
  endDate: '',
  DateSigned: '',
  RenewalDate: '',
  memo: '',
}

export { initialRenewal, renewSchema }
