import { object, string } from 'yup'

const createOrganisationSchema = object().shape({
  name: string().required('Organisation must have a name!'),
  replyToEmail: string()
    .email('Invalid Email')
    .required('Organisation email is required'),
  taxId: string()
    .required('Tax Id is required')
    .test('len', '9 digits Required', (val = '') => {
      return val.replace(/\s/g, '').length === 11
    }),
  logoUrl: string().nullable(),
  location: object().shape({
    streetNumber: string(),
    streetName: string().required('Street Name is required'),
    city: string().required('City is required'),
    province: string().required('Province is required'),
    country: string().required('Country is required'),
  }),
  adminContact: object().shape({
    firstName: string().required('Admin First Name is required'),
    lastName: string().required('Admin Last Name is required'),
    avatar: string().nullable(),
    position: string().required('Admin Position is required'),
    email: string().email('Invalid Email').required('Admin Email is required'),
    phone: string()
      .required('Admin Phone number is required')
      .test(
        'len',
        '10 digits Required',
        (val = '') =>
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
      ),
    phoneType: string(),
  }),
  billingContact: object().shape({
    firstName: string().required('Biller First Name is required'),
    lastName: string().required('Biller Last Name is required'),
    position: string().required('Biller Position is required'), //make this required in future
    email: string().email('Invalid Email').required('Biller Email is required'),
    phoneType: string(),
    phone: string()
      .required('Biller Phone number is required')
      .test(
        'len',
        '10 digits Required',
        (val = '') =>
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
      ),
  }),
  technicalContact: object().shape({
    firstName: string().required('Technical First Name is required'),
    lastName: string().required('Technical Last Name is required'),
    position: string().required('Technical Position is required'), //make this required in future
    email: string()
      .email('Invalid Email')
      .required('Technical Email is required'),
    phoneType: string(),
    phone: string()
      .required('Technical Phone number is required')
      .test(
        'len',
        '10 digits Required',
        (val = '') =>
          val.replace(/\s/g, '').replace('(', '').replace(')', '-').length ===
          12
      ),
  }),
})
const initialOrganisation = {
  name: '',
  taxId: '',
  replyToEmail: '',
  organisationEmail: '',
  logoUrl: 'https://i.ibb.co/2ndQMZt/Aegis.png',
  location: {
    streetNumber: '',
    streetName: '',
    province: '',
    city: '',
    country: '',
  },
  adminContact: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    avatar: 'https://i.ibb.co/QJJdr5C/user.jpg',
  },
  billingContact: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
  },
  technicalContact: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
  },
}

const createUserSchema = object().shape({
  firstName: string().required('First name is required!'),
  lastName: string().required('Last name is required!'),
  email: string().email('Email must be valid').required('Email is required'),
  position: string().required('Position is required'),
})
const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  position: '',
}

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
  initialOrganisation,
  createOrganisationSchema,
  initialUser,
  createUserSchema,
  Parishes,
  States,
  Countries,
}
