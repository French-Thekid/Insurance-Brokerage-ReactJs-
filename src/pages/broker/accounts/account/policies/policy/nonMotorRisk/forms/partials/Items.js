import React from 'react'
import 'styled-components/macro'
import { FieldArray } from 'formik'
import { FormControl, Core, Colours } from 'components'

function Items(props) {
  const { values, errors, setActivateItemsVal } = props
  const { Items } = values
  return (
    <>
      <FormControl.FieldSet>
        <FormControl.Legend>Items</FormControl.Legend>
        <FieldArray
          name="Items"
          render={(arrayHelpers) => (
            <div
              css={`
                max-height: 580px;
                overflow: auto;
                padding-top: 2px;
              `}
            >
              {Items.map((Item, index) => (
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
                  <section
                    id="insured"
                    css={`
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      grid-column-gap: 10px;
                      margin-bottom: 5px;
                    `}
                  >
                    <section>
                      <label
                        css={`
                          color: ${Colours.text};
                        `}
                      >
                        Type
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Items.${index}.type`}
                        type="text"
                        placeholder="eg. Radio"
                        style={{ marginBottom: '0' }}
                        onClick={() => {
                          if (
                            Items[index].type !== '' ||
                            Items[index].value !== '' ||
                            Items[index].description !== ''
                          )
                            setActivateItemsVal(true)
                          else setActivateItemsVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="type"
                        show={
                          errors.Items
                            ? errors.Items[index]
                              ? errors.Items[index].type
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Items
                            ? errors.Items[index]
                              ? errors.Items[index].type
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
                        Value
                      </label>
                      <FormControl.FieldArrayInput
                        name={`Items.${index}.value`}
                        type="text"
                        placeholder="eg. 25000"
                        style={{ marginBottom: '0' }}
                        onClick={() => {
                          if (
                            Items[index].type !== '' ||
                            Items[index].value !== '' ||
                            Items[index].description !== ''
                          )
                            setActivateItemsVal(true)
                          else setActivateItemsVal(false)
                        }}
                      />
                      <FormControl.Error
                        name="value"
                        show={
                          errors.Items
                            ? errors.Items[index]
                              ? errors.Items[index].value
                                ? true
                                : false
                              : false
                            : false
                        }
                        message={
                          errors.Items
                            ? errors.Items[index]
                              ? errors.Items[index].value
                              : null
                            : null
                        }
                      />
                    </section>
                  </section>
                  <section>
                    <label
                      css={`
                        color: ${Colours.text};
                      `}
                    >
                      Description
                    </label>
                    <FormControl.FieldArrayTextField
                      name={`Items.${index}.description`}
                      rows="4"
                      cols="80"
                      component="textarea"
                      placeholder="Type Description here"
                      onClick={() => {
                        if (
                          Items[index].type !== '' ||
                          Items[index].value !== '' ||
                          Items[index].description !== ''
                        )
                          setActivateItemsVal(true)
                        else setActivateItemsVal(false)
                      }}
                    />
                  </section>
                  <section
                    css={`
                      display: grid;
                      grid-template-columns: 150px 150px;
                      grid-column-gap: 5px;
                      align-items: end;
                      margin-top: 10px;
                    `}
                  >
                    {index !== 0 || Items.length >= 2 ? (
                      <Core.Button
                        style={{ width: '150px' }}
                        type="button"
                        bgColour={Colours.red}
                        onClick={() => {
                          Items[index].type === ''
                            ? arrayHelpers.remove(index)
                            : console.log('Not Empty')
                        }}
                      >
                        Remove Item
                      </Core.Button>
                    ) : null}
                    {index + 1 === Items.length ? (
                      <Core.Button
                        type="button"
                        style={{ width: '150px' }}
                        bgColour={Colours.green}
                        onClick={() => {
                          arrayHelpers.insert(index + 1, {
                            value: '',
                            type: '',
                            description: '',
                          })
                        }}
                      >
                        Add More Item
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
export default Items
