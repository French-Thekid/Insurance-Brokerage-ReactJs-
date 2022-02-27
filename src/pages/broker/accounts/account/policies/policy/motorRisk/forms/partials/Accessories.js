import React from 'react'
import 'styled-components/macro'
import { FieldArray } from 'formik'
import { Core, FormControl, Colours } from 'components'

export default function (props) {
  const { values, errors, setActivateTypeVal } = props
  const { Accessories } = values
  return (
    <>
      <FormControl.FieldSet>
        <FormControl.Legend>Accessories</FormControl.Legend>

        <FieldArray
          name="Accessories"
          render={(arrayHelpers) => (
            <div
              css={`
                max-height: 580px;
                overflow: auto;
                padding-top: 2px;
              `}
            >
              {Accessories.map((Accessory, index) => (
                <div key={index}>
                  <section
                    id="insured"
                    css={`
                      display: grid;
                      grid-template-rows: max-content 1fr;
                      grid-row-gap: 20px;
                      padding: 10px;
                      padding-bottom: 20px;
                      border: 1px solid ${Colours.border};
                      border-radius: 5px;
                      margin: 5px 0px;
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
                    <section
                      css={`
                        &:hover {
                          & > label {
                            color: ${Colours.blue};
                          }
                        }
                      `}
                    >
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        Type
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Accessories.${index}.type`}
                        type="text"
                        placeholder="eg. Radio"
                        style={{ marginBottom: '0' }}
                        onClick={() => {
                          if (
                            Accessories[index].type !== '' ||
                            Accessories[index].description !== ''
                          )
                            setActivateTypeVal(true)
                          else setActivateTypeVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="type"
                        message={
                          errors.Accessories
                            ? errors.Accessories[index]
                              ? errors.Accessories[index].type
                              : null
                            : null
                        }
                      />
                    </section>
                    <section
                      css={`
                        &:hover {
                          & > label {
                            color: ${Colours.blue};
                          }
                        }
                      `}
                    >
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        Description
                      </label>
                      <FormControl.FieldArrayTextField
                        name={`Accessories.${index}.description`}
                        rows="4"
                        cols="70"
                        component="textarea"
                        placeholder="Type Description here"
                        onClick={() => {
                          if (
                            Accessories[index].type !== '' ||
                            Accessories[index].description !== ''
                          )
                            setActivateTypeVal(true)
                          else setActivateTypeVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="description"
                        message={
                          errors.Accessories
                            ? errors.Accessories[index]
                              ? errors.Accessories[index].description
                              : null
                            : null
                        }
                      />
                    </section>
                  </section>
                  <section
                    css={`
                      display: grid;
                      grid-template-columns: 150px 150px;
                      grid-column-gap: 5px;
                      align-items: end;
                    `}
                  >
                    {index !== 0 || Accessories.length >= 2 ? (
                      <Core.Button
                        style={{ width: '150px', marginBottom: '10px' }}
                        type="button"
                        bgColour={Colours.red}
                        onClick={() => {
                          Accessories[index].type === ''
                            ? arrayHelpers.remove(index)
                            : console.log('Not Empty')
                        }}
                      >
                        Remove Accessory
                      </Core.Button>
                    ) : null}
                    {index + 1 === Accessories.length ? (
                      <Core.Button
                        type="button"
                        style={{ width: '150px', marginBottom: '10px' }}
                        bgColour={Colours.green}
                        onClick={() => {
                          arrayHelpers.insert(index + 1, {
                            type: '',
                            description: '',
                          })
                        }}
                      >
                        Add Accessory
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
