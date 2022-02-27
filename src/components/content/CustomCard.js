import React, { useContext } from 'react'
import 'styled-components/macro'
import { Core, Icons, FormControl } from 'components'
import search from 'assets/searchIcon.png'
import { ColourContext } from 'context'

export default function CustomCard({
  children,
  title,
  minHeight = 'calc(100% - 2px)',
  minWidth = 'auto',
  close = false,
  addSearch,
  handleSearch,
  searchPlaceHolder = 'Search Name, Emails',
  action,
  query,
  bg = false,
}) {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          min-height: ${minHeight};
          min-width: ${minWidth};
          display: grid;
          grid-template-rows: 40px 1fr;
          overflow-y: auto;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          height: calc(100% - 2px);
        `}
      >
        <div
          css={`
            background: ${bg || Colours.title};
            border-bottom: 1px solid ${Colours.border};
            display: grid;
            grid-template-columns: ${addSearch
              ? 'max-content 1fr'
              : close
              ? '1fr 25px'
              : '1fr'};
            grid-column-gap: ${addSearch ? '10px' : '0px'};
            align-items: center;
            padding: 0px 10px;
          `}
        >
          <Core.Text weight="600">{title}</Core.Text>
          {addSearch && (
            <FormControl.InputWithImage
              value={query}
              onChange={handleSearch}
              placeholder={searchPlaceHolder}
              bntImage={search}
              action={action}
            />
          )}
          {close && (
            <section
              data-cy="dialog-close"
              onClick={() => close()}
              css={`
                color: ${Colours.text};
                transition: ease-out 0.2s;
                &:hover {
                  cursor: pointer;
                  transition: ease-out 0.2s;
                  transform: translateY(-1px);
                  color: ${Colours.red};
                }
              `}
            >
              <Icons.CloseIcon style={{ color: 'inherit' }} />
            </section>
          )}
        </div>
        <div
          css={`
            height: calc(100% - 20px);
            padding: 10px;
            overflow-y: auto;
            background: ${Colours.bg1};
          `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
