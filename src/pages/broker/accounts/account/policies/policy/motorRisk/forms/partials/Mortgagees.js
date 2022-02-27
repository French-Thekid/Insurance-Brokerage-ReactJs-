import React from 'react'
import 'styled-components/macro'
import { FieldArray } from 'formik'
import { currencies } from '../../../../forms/initialValues'
import { FormControl, Core, Colours } from 'components'

function Mortgagees(props) {
  const { values, errors, setActivateMotgageesVal } = props
  const { Mortgagees } = values
  return (
    <>
      <FormControl.FieldSet>
        <FormControl.Legend>Mortgagees</FormControl.Legend>

        <FieldArray
          name="Mortgagees"
          render={(arrayHelpers) => (
            <div
              css={`
                max-height: 580px;
                overflow: auto;
                padding-top: 2px;
              `}
            >
              {Mortgagees.map((Mortgagee, index) => (
                <div
                  key={index}
                  css={`
                    padding: 10px;
                    border: 1px solid ${Colours.border};
                    border-radius: 5px;
                    margin-bottom: 15px;
                    &:hover {
                      cursor: pointer;
                      box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
                        0 3.5px 12.6px rgba(0, 0, 0, 0.037),
                        0 10px 35px rgba(0, 0, 0, 0.08);
                      transform: translateY(-1px);
                      border: 0.1px solid ${Colours.blue};
                    }
                    transition-timing-function: cubic-bezier(
                      0.17,
                      0.67,
                      0.83,
                      0.67
                    );
                    transition-duration: 0.3s;
                  `}
                >
                  <FormControl.ResponsiveSection cols={3}>
                    <section>
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        National ID Type
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Mortgagees.${index}.nationalIdType`}
                        type="text"
                        placeholder="eg. Driver's License"
                        style={{ marginBottom: '0' }}
                        onClick={() => {
                          if (
                            Mortgagees[index].nationalIdType !== '' ||
                            Mortgagees[index].nationalIdNum !== '' ||
                            Mortgagees[index].Branch !== '' ||
                            Mortgagees[index].currency !== '' ||
                            Mortgagees[index].loanAmount !== ''
                          )
                            setActivateMotgageesVal(true)
                          else setActivateMotgageesVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="nationalIdType"
                        show={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].nationalIdType
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].nationalIdType
                              : null
                            : null
                        }
                      />
                    </section>
                    <section>
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        National ID Number
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Mortgagees.${index}.nationalIdNum`}
                        type="text"
                        placeholder="eg. 123-456-123"
                        style={{ marginBottom: '0' }}
                        maxLength="11"
                        onClick={() => {
                          if (
                            Mortgagees[index].nationalIdType !== '' ||
                            Mortgagees[index].nationalIdNum !== '' ||
                            Mortgagees[index].Branch !== '' ||
                            Mortgagees[index].currency !== '' ||
                            Mortgagees[index].loanAmount !== ''
                          )
                            setActivateMotgageesVal(true)
                          else setActivateMotgageesVal(false)
                        }}
                      />

                      <FormControl.Error
                        name="nationalIdNum"
                        show={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].nationalIdNum
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].nationalIdNum
                              : null
                            : null
                        }
                      />
                    </section>
                    <section>
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        Branch
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Mortgagees.${index}.Branch`}
                        type="text"
                        placeholder="eg. New Kingston"
                        style={{ marginBottom: '0' }}
                        onClick={() => {
                          if (
                            Mortgagees[index].nationalIdType !== '' ||
                            Mortgagees[index].nationalIdNum !== '' ||
                            Mortgagees[index].Branch !== '' ||
                            Mortgagees[index].currency !== '' ||
                            Mortgagees[index].loanAmount !== ''
                          )
                            setActivateMotgageesVal(true)
                          else setActivateMotgageesVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="Branch"
                        show={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].Branch
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].Branch
                              : null
                            : null
                        }
                      />
                    </section>
                    <section
                      css={`
                        height: max-content;
                        margin-top: 10px;
                        margin-bottom: 10px;
                      `}
                    >
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        Currency
                      </label>
                      <FormControl.FieldArraySelect
                        name={`Mortgagees.${index}.currency`}
                        value={Mortgagees[index].currency}
                        groups={currencies}
                      />
                      <FormControl.Error
                        name="currency"
                        show={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].currency
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].currency
                              : null
                            : null
                        }
                      />
                    </section>

                    <section
                      css={`
                        margin-top: 10px;
                        margin-bottom: 10px;
                      `}
                    >
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        Loan Amount
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Mortgagees.${index}.loanAmount`}
                        type="number"
                        placeholder="eg. 250250"
                        style={{ marginBottom: '0' }}
                        onClick={() => {
                          if (
                            Mortgagees[index].nationalIdType !== '' ||
                            Mortgagees[index].nationalIdNum !== '' ||
                            Mortgagees[index].Branch !== '' ||
                            Mortgagees[index].currency !== '' ||
                            Mortgagees[index].loanAmount !== ''
                          )
                            setActivateMotgageesVal(true)
                          else setActivateMotgageesVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="loanAmount"
                        show={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].loanAmount
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Mortgagees
                            ? errors.Mortgagees[index]
                              ? errors.Mortgagees[index].loanAmount
                              : null
                            : null
                        }
                      />
                    </section>
                  </FormControl.ResponsiveSection>

                  <section
                    css={`
                      margin-top: 10px;
                      margin-bottom: 10px;
                    `}
                  >
                    <label
                      css={`
                        color: ${Colours.text};
                      `}
                    >
                      Notes
                    </label>
                    <FormControl.FieldArrayTextField
                      name={`Mortgagees.${index}.notes`}
                      rows="4"
                      cols="100"
                      component="textarea"
                      placeholder="Type Notes here"
                    />
                  </section>

                  <section
                    css={`
                      display: grid;
                      grid-template-columns: 150px 150px;
                      grid-column-gap: 5px;
                      margin-top: 10px;
                      align-items: end;
                    `}
                  >
                    {index !== 0 || Mortgagees.length >= 2 ? (
                      <Core.Button
                        style={{ width: '150px' }}
                        type="button"
                        bgColour={Colours.red}
                        onClick={() => {
                          Mortgagees[index].currency === ''
                            ? arrayHelpers.remove(index)
                            : console.log('Not Empty')
                        }}
                      >
                        Remove Mortgagee
                      </Core.Button>
                    ) : null}
                    {index + 1 === Mortgagees.length ? (
                      <Core.Button
                        type="button"
                        style={{ width: '150px' }}
                        bgColour={Colours.green}
                        onClick={() => {
                          arrayHelpers.insert(index + 1, {
                            notes: '',
                            loanAmount: '',
                            currency: '',
                            Branch: '',
                            nationalIdNum: '',
                            nationalIdType: '',
                          })
                        }}
                      >
                        Add Mortgagee
                      </Core.Button>
                    ) : null}
                  </section>
                </div>
              ))}
            </div>
          )}
        />
      </FormControl.FieldSet>
    </>
  )
}
export default Mortgagees
