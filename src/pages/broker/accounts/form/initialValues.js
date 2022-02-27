import { object, string } from 'yup'

const createOrganizationAccountSchema = object().shape({
  email: string()
    .email('Invalid Email')
    .required('Account must have an email.'),
  avatar: string().nullable(),
  companyName: string().required('Company name is required.'),
  industry: string(),
  taxIdNumber: string()
    .required('Required')
    .test('len', '9 digits Required', (val = '') => {
      return val.replace(/\s/g, '').length === 11
    }),
  //Location
  streetNumber: string(),
  streetName: string().required('Street Name is required'),
  parish: string().required('Parish/State is required'),
  city: string().required('City is required'),
  country: string().required('Country is required'),
  //Phone Number
  phoneType: string(),
  phoneCarrier: string(),
  phoneNumber: string()
    .required('Contact number is required')
    .test('len', '10 digits Required', (val = '') => {
      return (
        val.replace(/\s/g, '').replace('(', '').replace(')', '-').length === 12
      )
    }),
  phoneExtension: string(),
})

const editOrganizationAccountSchema = object().shape({
  email: string()
    .email('Invalid Email')
    .required('Account must have an email.'),
  avatar: string().nullable(),
  companyName: string().required('Company name is required.'),
  industry: string(),
  taxIdNumber: string()
    .required('Required')
    .test('len', '9 digits Required', (val = '') => {
      if (val.indexOf('-') === -1 && val.length === 9) return true
      else return val.replace(/\s/g, '').length === 11
    }),
  //Location
  streetNumber: string(),
  streetName: string().required('Street Name is required'),
  parish: string().required('Parish/State is required'),
  city: string().required('City is required'),
  country: string().required('Country is required'),
  //Phone Number
  phoneType: string(),
  phoneCarrier: string(),
  phoneNumber: string()
    .required('Contact number is required')
    .test('len', '10 digits Required', (val = '') => {
      if (val.indexOf('(') === -1 && val.length === 10) return true
      else
        return (
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
        )
    }),
  phoneExtension: string(),
})

const createIndividualAccountSchema = object().shape({
  title: string(),
  email: string()
    .email('Invalid Email')
    .required('Account must have an email.'),
  avatar: string(),
  salutationName: string(),
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  middleName: string(),
  maritalStatus: string(),
  dateOfBirth: string().nullable(),
  placeOfBirth: string(),
  nationality: string(),
  gender: string('Selection Needed').required('Gender is required'),
  occupation: string(),
  companyName: string(),
  industry: string(),
  taxIdNumber: string(),
  taxIdType: string(),
  employmentType: string(),
  dlNumber: string()
    .required('Drivers License number is required')
    .test('len', '9 digits Required', (val = '') => {
      return val.replace(/\s/g, '').length === 11
    }),
  dlCountry: string(),
  dlDateIssued: string().nullable(),
  dlDateFirstIssued: string().nullable(),
  dlType: string(),
  dlExpirationDate: string().nullable(),
  //Location
  streetNumber: string(),
  streetName: string().required('Street Name is required'),
  parish: string().required('Parish/State is required'),
  city: string().required('City is required'),
  country: string().required('Country is required'),
  //Phone Number
  phoneType: string(),
  phoneCarrier: string(),
  phoneNumber: string()
    .required('Contact number is required')
    .test('len', '10 digits Required', (val = '') => {
      if (val.indexOf('(') === -1 && val.length === 10) return true
      else
        return (
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
        )
    }),
  phoneExtension: string(),
})

const types = [
  { label: 'Mobile', value: 'Mobile' },
  { label: 'Office', value: 'Office' },
  { label: 'Fixed Line', value: 'Fixed Line' },
  { label: 'Cell', value: 'Cell' },
  { label: 'Home', value: 'Home' },
]

const initialAccount = {
  title: '',
  email: '',
  avatar: '',
  salutationName: '',
  firstName: '',
  lastName: '',
  middleName: '',
  maritalStatus: '',
  dateOfBirth: '',
  placeOfBirth: '',
  nationality: '',
  gender: '',
  occupation: '',
  companyName: '',
  industry: '',
  taxIdNumber: '',
  taxIdType: '',
  employmentType: '',
  dlNumber: '',
  dlCountry: '',
  dlDateIssued: '',
  dlDateFirstIssued: '',
  dlType: '',
  dlExpirationDate: '',
  //Location
  streetNumber: '',
  streetName: '',
  parish: '',
  city: '',
  country: '',
  //Phone Number
  phoneType: '',
  phoneCarrier: '',
  phoneNumber: '',
  phoneExtension: '',
}
const initialCompanyAccount = {
  email: '',
  avatar: '',
  companyName: '',
  industry: '',
  taxIdNumber: '',
  //Location
  streetNumber: '',
  streetName: '',
  parish: '',
  city: '',
  country: '',
  //Phone Number
  phoneType: '',
  phoneCarrier: '',
  phoneNumber: '',
  phoneExtension: '',
}

let maritalStatuses = [
  {
    label: 'Married',
    value: 'Married',
  },
  {
    label: 'Single',
    value: 'Single',
  },
  {
    label: 'Divorced',
    value: 'Divorced',
  },
]

let genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]

const employmentTypes = [
  { value: 'Unemployed', label: 'Unemployed' },
  { value: 'Self-Employed', label: 'Self-Employed' },
  { value: 'Employed-Fulltime', label: 'Employed-Fulltime' },
  { value: 'Employed-Partime', label: 'Employed-Partime' },
  { value: 'Freelancer', label: 'Freelancer' },
  { value: 'Retired', label: 'Retired' },
  { value: 'Homemaker', label: 'Homemaker' },
]
const contactTypes = [
  {
    label: 'Digicel',
    value: 'Digicel',
  },
  {
    label: 'Flow',
    value: 'Flow',
  },
  {
    label: 'Others',
    value: 'Others',
  },
]
const Licenses = [
  {
    label: 'General',
    value: 'General',
  },
  {
    label: 'Private',
    value: 'Private',
  },
  {
    label: 'Motorcycle',
    value: 'Motorcycle',
  },
  {
    label: 'Class A',
    value: 'Class A',
  },
  {
    label: 'Class B',
    value: 'Class B',
  },
  {
    label: 'Class C',
    value: 'Class C',
  },
  {
    label: 'Class M',
    value: 'Class M',
  },
]

const Titles = [
  {
    label: 'Dr.',
    value: 'Dr.',
  },
  {
    label: 'Esq.',
    value: 'Esq.',
  },
  {
    label: 'Hon.',
    value: 'Hon.',
  },
  {
    label: 'Jr.',
    value: 'Jr.',
  },
  {
    label: 'Mr.',
    value: 'Mr.',
  },
  {
    label: 'Mrs.',
    value: 'Mrs.',
  },
  {
    label: 'Ms.',
    value: 'Ms.',
  },
  {
    label: 'Messrs.',
    value: 'Messrs.',
  },
  {
    label: 'Mmes.',
    value: 'Mmes.',
  },
  {
    label: 'Msgr.',
    value: 'Msgr.',
  },
  {
    label: 'Prof.',
    value: 'Prof.',
  },
  {
    label: 'Rev.',
    value: 'Rev.',
  },
  {
    label: 'Rt. Hon..',
    value: 'Rt. Hon..',
  },
  {
    label: 'Sr.',
    value: 'Sr.',
  },
  {
    label: 'St.',
    value: 'St.',
  },
]

const Parishes = [
  { label: 'Hanover', value: 'Hanover' },
  { label: 'St. Elizabeth', value: 'St. Elizabeth' },
  { label: 'St. James', value: 'St. James' },
  { label: 'Trelawny', value: 'Trelawny' },
  { label: 'Westmoreland', value: 'Westmoreland' },
  { label: 'Clarendon', value: 'Clarendon' },
  { label: 'Manchester', value: 'Manchester' },
  { value: 'St. Ann', label: 'St. Ann' },
  { label: 'St. Catherine', value: 'St. Catherine' },
  { label: 'St. Mary', value: 'St. Mary' },
  { label: 'Kingston', value: 'Kingston' },
  { label: 'Portland', value: 'Portland' },
  { label: 'St. Andrew', value: 'St. Andrew' },
  { label: 'St. Thomas', value: 'St. Thomas' },
]

const Countries = [
  { label: 'Jamaica', value: 'Jamaica' },
  { label: 'United States', value: 'United States' },
]

const States = [
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'American Samoa', value: 'American Samoa' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'District of Columbia', value: 'District of Columbia' },
  {
    label: 'Federated States of Micronesia',
    value: 'Federated States of Micronesia',
  },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Guam', value: 'Guam' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'Illinois', value: 'Illinois' },
  { label: 'Indiana', value: 'Indiana' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Marshall Islands', value: 'Marshall Islands' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Montana', value: 'Montana' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'New York', value: 'New York' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Northern Mariana Islands', value: 'Northern Mariana Islands' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Palau', value: 'Palau' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Puerto Rico', value: 'Puerto Rico' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Virgin Island', value: 'Virgin Island' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Washington', value: 'Washington' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'Wyoming', value: 'Wyoming' },
]
export {
  genders,
  types,
  maritalStatuses,
  contactTypes,
  Parishes,
  employmentTypes,
  Countries,
  States,
  Titles,
  Licenses,
  createOrganizationAccountSchema,
  createIndividualAccountSchema,
  initialAccount,
  editOrganizationAccountSchema,
  initialCompanyAccount,
}
