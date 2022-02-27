import React, { useState, useContext } from 'react'
import 'styled-components/macro'
// import { SessionContext } from 'providers'
import { Core } from '../index'
import 'assets/styles/index.css'
import { ColourContext } from 'context'

function StepForm(props) {
  const { Colours } = useContext(ColourContext)
  const { children, handleSubmit, isSubmitting, errors = {} } = props
  const [index, setIndex] = useState(0)
  const length = React.Children.toArray(children).length
  const shouldSubmit = index === length - 1
  const isFirstPage = index === 0
  const handleNext = () =>
    index === length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () => (index === 0 ? setIndex(0) : setIndex(index - 1))

  const page = index + 1
  const activePage = (page / length) * 100

  return (
    <form onSubmit={handleSubmit}>
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 20px;
          align-items: Center;
          grid-column-gap: 5px;
        `}
      >
        <section
          css={`
            background: ${Colours.softGrey};
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
          `}
        >
          <div
            css={`
              width: ${activePage}%;
              height: 4px;
              background: ${activePage === 100 ? Colours.green : Colours.blue};
              border-top-right-radius: 50px;
              border-bottom-right-radius: 50px;
              transition: ease-out 0.2s;
            `}
          />
        </section>
        <Core.Text
          customSize="10px"
          color={activePage === 100 ? Colours.green : Colours.blue}
        >
          {page}/{length}
        </Core.Text>
      </div>
      {React.Children.toArray(children)[index]}
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          margin-top: 10px;
        `}
      >
        <div>
          {!isFirstPage && (
            <Core.Button
              type="button"
              width="150px"
              style={{
                float: 'left',
                border: `1px solid ${Colours.blue}`,
              }}
              bgColour="#fff"
              fontColour={Colours.blue}
              onClick={handlePrevious}
              outline
              // action={user.role === 'SupportAdmin' ? 'READ' : 'WRITE'}
            >
              Previous
            </Core.Button>
          )}
        </div>
        <div>
          {shouldSubmit ? (
            <button
              css={`
                width: 150px;
                min-width: max-content;
                height: max-content;
                background: ${Colours.green};
                color: white;
                font-weight: 600;
                border: 1px solid ${Colours.green};
                padding: 6px;
                box-shadow: 0px 0px 2px 0px rgba(166, 166, 166, 1);
                border-radius: 3px;
                display: grid;
                justify-items: Center;
                outline: none;
                align-items: Center;
                margin-bottom: 0px;
                float: right;
                &:hover {
                  cursor: pointer;
                  box-shadow: 0px 3px 3px 0px rgba(196, 196, 196, 1);
                  transition: ease-out 0.2s;
                  transform: translateY(-1px);
                }
                &:disabled {
                  cursor: not-allowed;
                  opacity: 0.6;
                  filter: grayscale(40%);
                }
              `}
              type="submit"
              // noOp={'none'}
              disabled={isSubmitting || Object.keys(errors).length > 0}
              // action={user.role === 'SupportAdmin' ? 'READ' : 'WRITE'}
            >
              {props.specialSubmit || 'Submit'}
            </button>
          ) : (
            <>
              {props.edit && (
                <button
                  css={`
                    width: 150px;
                    min-width: max-content;
                    height: max-content;
                    background: ${Colours.green};
                    color: white;
                    font-weight: 600;
                    border: 1px solid ${Colours.green};
                    padding: 6px;
                    box-shadow: 0px 0px 2px 0px rgba(166, 166, 166, 1);
                    border-radius: 3px;
                    display: grid;
                    justify-items: Center;
                    outline: none;
                    align-items: Center;
                    margin-bottom: 0px;
                    margin-left: 10px;
                    float: right;
                    &:hover {
                      cursor: pointer;
                      box-shadow: 0px 3px 3px 0px rgba(196, 196, 196, 1);
                      transition: ease-out 0.2s;
                      transform: translateY(-1px);
                    }
                    &:disabled {
                      cursor: not-allowed;
                      opacity: 0.6;
                      filter: grayscale(40%);
                    }
                  `}
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  // action={user.role === 'SupportAdmin' ? 'READ' : 'WRITE'}
                >
                  Submit
                </button>
              )}
              <Core.Button
                type="button"
                width="150px"
                style={{
                  float: 'right',
                  border: `1px solid ${Colours.blue}`,
                }}
                onClick={handleNext}
                // action={user.role === 'SupportAdmin' ? 'READ' : 'WRITE'}
              >
                Next
              </Core.Button>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

export default StepForm
