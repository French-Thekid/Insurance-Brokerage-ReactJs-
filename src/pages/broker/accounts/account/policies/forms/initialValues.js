import { object, string, number, array } from 'yup'

const trnRegExp = /^([[0-9][0-9][0-9][-][0-9][0-9][0-9][-][0-9][0-9][0-9]$)/

function createMotorPolicySchema({ I1Ismain, I2Ismain }) {
  return object().shape({
    Prefix: string(),
    Status: string(),
    Memo: string(),
    Usage: string(),
    Currency: string(),
    MutualAgreement: string(),
    ThirdParty: string(),
    Premium: string(),
    Balance: string(),
    InceptionDate: string(),
    StartDate: string(),
    EndDate: string(),
    DateSigned: string(),
    RenewalDate: string(),
    RenewalMemo: string(),
    Branch: string(),
    Country: string(),
    Occupancy: string(),
    GroupName: string(),
    LimitGroup: string(),
    Name: string(),
    Type: string(),
    Limit: string(),
    Description: string(),
    firstName: string(),
    lastName: string(),
    email: string().email('Email must be valid!'),
    isMain: number(),
    taxIDNum: number(),
    dlExpirationDate: string(),
    dlIssueDate: string(),
    nationality: string(),
    I1firstName: I1Ismain
      ? string().required('First Name is required!')
      : string().nullable(),
    I1lastName: I1Ismain
      ? string().required('Last Name is required!')
      : string().nullable(),
    I1nationality: string(),
    I1email: I1Ismain
      ? string().required('Email is required!')
      : string().nullable(),
    I1dlExpirationDate: string(),
    I1taxIdNum: I1Ismain
      ? string().required('Drivers License number is required')
      : string().nullable(),
    I1dlIssueDate: string(),
    I1isMain: string(),
    I2firstName: I2Ismain
      ? string().required('First Name is required!')
      : string().nullable(),
    I2lastName: I2Ismain
      ? string().required('Last Name is required!')
      : string().nullable(),
    I2nationality: string(),
    I2email: I2Ismain
      ? string().required('Email is required!')
      : string().nullable(),
    I2dlExpirationDate: string(),
    I2taxIdNum: I2Ismain
      ? string().required('Drivers License number is required')
      : string().nullable(),
    I2dlIssueDate: string(),
    I2isMain: string(),
  })
}

const editPolicySchema = object().shape({
  Prefix: string(),
  Status: string(),
  Memo: string(),
  Usage: string(),
  Currency: string(),
  MutualAgreement: string(),
  ThirdParty: string(),
  Premium: string(),
  Balance: string(),
  InceptionDate: string().nullable(),
  StartDate: string().nullable(),
  EndDate: string().nullable(),
  DateSigned: string().nullable(),
  RenewalDate: string().nullable(),
  Branch: string(),
  Country: string(),
  Occupancy: string(),
  GroupName: string(),
  LimitGroup: string(),
})

const Usages = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Other', value: 'Other' },
]

const RoofTypes = [
  { label: 'Zinc', value: 'Zinc' },
  { label: 'Asphalt shingles', value: 'Asphalt shingles' },
  { label: 'Metal roofing', value: 'Metal roofing' },
  { label: 'Stone-coated steel', value: 'Stone-coated steel' },
  { label: 'Slate', value: 'Slate' },
  { label: 'Rubber slate', value: 'Rubber slate' },
  { label: 'Clay and concrete tiles ', value: 'Clay and concrete tiles ' },
  { label: 'Green roofs', value: 'Green roofs' },
  { label: 'Built-up roofing', value: 'Built-up roofing' },
  { label: 'Solar tiles', value: 'Solar tiles' },
]
const WallTypes = [
  { label: 'Concrete Block', value: 'Concrete Block' },
  { label: 'Bricks', value: 'Bricks' },
  { label: 'Wood', value: 'Wood' },
  { label: 'Cavity Walls', value: 'Cavity Walls' },
  { label: 'Shear Wall', value: 'Shear Wall' },
  { label: 'Partition Wall', value: 'Partition Wall' },
  { label: 'Veneered Walls', value: 'Veneered Walls' },
  { label: 'Faced Wall', value: 'Faced Wall' },
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
const initialPolicy = {
  Prefix: '',
  Status: '',
  Memo: '',
  Usage: '',
  Currency: '',
  MutualAgreement: '',
  ThirdParty: '',
  Premium: '',
  Balance: '',
  InceptionDate: '',
  StartDate: '',
  EndDate: '',
  DateSigned: '',
  RenewalDate: '',
  RenewalMemo: '',
  Branch: '',
  Country: '',
  Occupancy: '',
  GroupName: '',
  LimitGroup: '',
  //Extentions
  Name: '',
  Type: '',
  Limit: '',
  Description: '',
  //Insured

  I1firstName: '',
  I1lastName: '',
  I1nationality: '',
  I1email: '',
  I1taxIdNum: '',
  I1dlExpirationDate: '',
  I1dlIssueDate: '',
  I1isMain: false,

  I2firstName: '',
  I2lastName: '',
  I2nationality: '',
  I2email: '',
  I2taxIdNum: '',
  I2dlExpirationDate: '',
  I2dlIssueDate: '',
  I2isMain: false,
}

const initialNonMotorRisk = {
  type: '',
  details: '',
  description: '',
  occupancy: '',
  roofConstruction: '',
  wallConstruction: '',
  storeys: '',
  subPremise: '',
  year: '',
  usage: '',
  sumInsured: '',
  premise: '',
  streetNumber: '',
  thoroughfare: '',
  locality: '',
  adminAreaLv1: '',
  adminAreaLv2: '',
  country: '',
  latitude: '',
  longitude: '',
  postalCode: '',
  Mortgagees: [
    {
      notes: '',
      loanAmount: '',
      currency: '',
      Branch: '',
      nationalIdNum: '',
      nationalIdType: '',
    },
  ],
  Items: [
    {
      value: '',
      type: '',
      description: '',
    },
  ],
}
const initialMotorRisk = {
  vin: '',
  riskId: '',
  accountId: '',
  regNum: '',
  make: '',
  model: '',
  colour: '',
  modelType: '',
  bodyType: '',
  bodyShape: '',
  engineNum: '',
  engineType: '',
  engineModified: '',
  numberOfEngines: '',
  NumberOfCylinders: '',
  ccRating: '',
  mileage: '',
  transmissionType: '',
  tonnage: '',
  numOfDoors: '',
  electricDoors: '',
  electricWindows: '',
  electricMirrors: '',
  leftHandDrive: '',
  powersteering: '',
  roofType: '',
  seating: '',
  seatType: '',
  authorizedDriverClause: '',
  year: '',
  usage: '',
  sumInsured: '',
  Accessories: [
    {
      type: '',
      description: '',
    },
  ],
  Mortgagees: [
    {
      notes: '',
      loanAmount: '',
      currency: '',
      Branch: '',
      nationalIdNum: '',
      nationalIdType: '',
    },
  ],
}

const createNonMotorRiskSchema = object().shape({
  type: string().required('Type is required'),
  details: string().required('Details is required'),
  description: string(),
  occupancy: string().required('Occupancy is required'),
  roofConstruction: string().required('Roof Construction is required'),
  wallConstruction: string().required('Wall Construction is required'),
  year: number('must be a number')
    .moreThan(1900, 'the provided year is invalid')
    .lessThan(2200, 'the provided year is invalid')
    .required('Year is required'),
  usage: string(),
  sumInsured: string(),
  storeys: string().required('Storeys is required'),
  subPremise: string().required('Sub Premise is required'),
  premise: string().required('Premise is required'),
  streetNumber: string(),
  thoroughfare: string().required('City is required'),
  country: string().required('Country is required'),
  Mortgagees: array().of(
    object().shape({
      loanAmount: string().required('A loan amount is required'),
      nationalIdType: string().required('A national ID type is required'),
      notes: string(),
      currency: string().required('A currency is required'),
      Branch: string().required('A Branch is required'),
      nationalIdNum: string()
        .matches(trnRegExp, 'National ID format should be XXX-XXX-XXX')
        .required('Drivers License number is required'),
    })
  ),
  Items: array().of(
    object().shape({
      value: string().required('Value is required'),
      type: string().required('Type is required'),
      description: string(),
    })
  ),
})
const updateNonMotorRiskSchema = object().shape({
  type: string().required('Type is required'),
  details: string().required('Details is required'),
  description: string(),
  occupancy: string().required('Occupancy is required'),
  roofConstruction: string().required('Roof Construction is required'),
  wallConstruction: string().required('Wall Construction is required'),
  year: number('must be a number')
    .moreThan(1900, 'the provided year is invalid')
    .lessThan(2200, 'the provided year is invalid')
    .required('Year is required'),
  usage: string(),
  sumInsured: string(),
  storeys: string().required('Storeys is required'),
  subPremise: string().required('Sub Premise is required'),
  premise: string().required('Premise is required'),
  streetNumber: string(),
  thoroughfare: string().required('City is required'),
  country: string().required('Country is required'),
})
const createMotorRiskSchema = object().shape({
  vin: string().required('Chassis / VIN is required'),
  regNum: string(),
  make: string().required(),
  model: string(),
  colour: string(),
  modelType: string(),
  bodyType: string(),
  bodyShape: string(),
  engineNum: string(),
  engineType: string(),
  engineModified: string(),
  numberOfEngines: number(),
  NumberOfCylinders: number(),
  ccRating: number(),
  mileage: number(),
  transmissionType: string(),
  tonnage: number(),
  numOfDoors: number(),
  electricDoors: string(),
  electricWindows: string(),
  electricMirrors: string(),
  leftHandDrive: string(),
  powersteering: string(),
  roofType: string(),
  seating: number(),
  seatType: string(),
  authorizedDriverClause: string(),
  year: number('must be a number')
    .moreThan(1900, 'the provided year is invalid')
    .lessThan(2200, 'the provided year is invalid')
    .required('Year is required'),
  usage: string(),
  sumInsured: string(),
  Accessories: array().of(
    object().shape({
      type: string().required('Type is required'),
      description: string().required('Description is required'),
    })
  ),
  Mortgagees: array().of(
    object().shape({
      loanAmount: string().required('A loan amount is required'),
      nationalIdType: string().required('A national ID type is required'),
      notes: string(),
      currency: string().required('A currency is required'),
      Branch: string().required('A Branch is required'),
      nationalIdNum: string()
        .matches(trnRegExp, 'National ID format should be XXX-XXX-XXX')
        .required('Drivers License number is required'),
    })
  ),
})

const currencies = [
  { label: 'JMD', value: 'JMD' },
  { label: 'CAD', value: 'CAD' },
  { label: 'USD', value: 'USD' },
]

let Transmission = [
  {
    label: 'Automatic',
    value: 'Automatic',
  },
  {
    label: 'Manual',
    value: 'Manual',
  },
  {
    label: 'Tiptronic',
    value: 'Tiptronic',
  },
]
let BodyTypes = [
  {
    label: 'Hatchback',
    value: 'Hatchback',
  },
  {
    label: 'Sedan',
    value: 'Sedan',
  },
  {
    label: 'MUV/SUV',
    value: 'MUV/SUV',
  },
  {
    label: 'Coupe',
    value: 'Coupe',
  },
  {
    label: 'Convertible',
    value: 'Convertible',
  },
  {
    label: 'Wagon',
    value: 'Wagon',
  },
  {
    label: 'VAN',
    value: 'VAN',
  },
  {
    label: 'Pick up',
    value: 'Pick up',
  },
]
let Seats = [
  {
    label: 'Polyester & Nylon',
    value: 'Polyester & Nylon',
  },
  {
    label: 'Wool',
    value: 'Wool',
  },
  {
    label: 'Vinyl',
    value: 'Vinyl',
  },
  {
    label: 'Leather',
    value: 'Leather',
  },
]
let Engines = [
  {
    label: 'VEE',
    value: 'VEE',
  },
  {
    label: 'INLINE',
    value: 'INLINE',
  },
  {
    label: 'STRAIGHT',
    value: 'STRAIGHT',
  },
  {
    label: 'VR and W',
    value: 'VR and W',
  },
  {
    label: 'BOXER',
    value: 'BOXER',
  },
  {
    label: 'ROTARY',
    value: 'ROTARY',
  },
]
let Options = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
]
let Roofs = [
  {
    label: 'Hard Top',
    value: 'Hard Top',
  },
  {
    label: 'Soft Top',
    value: 'Soft Top',
  },
]

let Prefixes = [
  {
    label: 'Prefix 1',
    value: 'Prefix 1',
  },
]
let Statuses = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
]
let MutualAgreements = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
]

const OccupancyTypes = [
  { value: 'Occupied', label: 'Occupied' },
  { value: 'Vacant', label: 'Vancant' },
]
const ApartmentTypes = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Town House', label: 'Town House' },
  { value: 'Condominium', label: 'Condominium' },
  { value: 'Cottage', label: 'Cottage' },
  { value: 'Cabin', label: 'Cabin' },
  { value: 'Carriage/Coach house', label: 'Carriage/Coach house' },
  { value: 'Mobile Home', label: 'Mobile Home' },
  { value: 'Mansion', label: 'Mansion' },
  { value: 'Tree house', label: 'Tree house' },
  { value: 'Castle', label: 'Castle' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Manor', label: 'Manor' },
]
let Currencies = [
  {
    label: 'JMD',
    value: 'JMD',
  },
  {
    label: 'CAD',
    value: 'CAD',
  },
  {
    label: 'USD',
    value: 'USD',
  },
]

export {
  Prefixes,
  Currencies,
  Statuses,
  MutualAgreements,
  editPolicySchema,
  OccupancyTypes,
  ApartmentTypes,
  createMotorRiskSchema,
  initialPolicy,
  initialMotorRisk,
  RoofTypes,
  WallTypes,
  States,
  Parishes,
  Countries,
  Transmission,
  BodyTypes,
  Seats,
  Engines,
  Options,
  Roofs,
  currencies,
  Usages,
  initialNonMotorRisk,
  createNonMotorRiskSchema,
  updateNonMotorRiskSchema,
  createMotorPolicySchema,
}
