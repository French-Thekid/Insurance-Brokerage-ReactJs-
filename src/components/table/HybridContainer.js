import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from '../../context'

import { Core, Icons, ImageWithStatus, Content } from 'components'
import ActionButtonContainer from './ActionButtonContainer'
import Checkbox from './Checkbox'

export default function HybridContainer({
  rowData = [],
  headerData = [],
  deleteAction = false,
  suspendAction = false,
  enableAction = false,
  editAction = false,
  hasAvatar = false,
  imageStatusNeeded = false,
  rowClick,
  breakingPoint,
  title,
  selectedRows,
  checkBoxNeeded,
  selectedAllRow,
  setSelectedRow,
}) {
  const id = rowData.id
  const OrganisationStatus = rowData.status

  const ArrayConvert = Object.keys(rowData).map((key) => {
    return rowData[key]
  })

  const { Colours } = useContext(ColourContext)

  return (
    <div
      id="Parent"
      css={`
        width: calc(100% - 20px);
        height: max-content;
        @media (min-width: ${breakingPoint}) {
          display: none;
        }
        @media (max-width: ${breakingPoint}) {
          display: visible;
        }
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-gap: 15px;
        align-items: ${hasAvatar ? 'center' : 'start'};
        padding: 10px 0px;
        border: ${selectedRows.rows.includes(rowData.id)
          ? `1px solid ${Colours.blue}`
          : `0.5px solid ${Colours.border}`};
        transform: ${selectedRows.rows.includes(rowData.id)
          ? 'translateY(-1px)'
          : 'none'};
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
        &:hover {
          border: 1px solid ${Colours.blue};
          cursor: pointer;
          transition: ease-out 0.2s;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        }
        box-shadow: 0px 0px 5px 0px rgba(207, 226, 255, 1);
      `}
      onClick={(event) => {
        if (event.target.id === 'Parent' || event.target.id === 'data')
          if (rowClick) {
            if (title === 'Documents' || title === 'Slips')
              rowClick(id, rowData.url)
            else if (
              title === 'Organisations' ||
              title === 'Insurers' ||
              title === 'Accounts' ||
              title === 'Motor Risks' ||
              title === 'Policies' ||
              title === 'Roles'
            )
              rowClick(id, rowData)
            else rowClick(id)
          } else console.log('No action Present')
      }}
    >
      {checkBoxNeeded ? (
        <>
          <Core.Text color={Colours.blue} weight="500" id="data">
            Select
          </Core.Text>
          <Checkbox
            id="except"
            whiteborder={selectedRows.rows.includes(rowData.id)}
            state={selectedAllRow || selectedRows.rows.indexOf(id) !== -1}
            actions={(checked) => {
              if (checked) {
                setSelectedRow((state) => {
                  const rows = state.rows.concat(id)
                  return {
                    rows,
                  }
                })
              } else {
                setSelectedRow((state) => {
                  const rows = state.rows.filter((item, j) => item !== id)
                  return {
                    rows,
                  }
                })
              }
            }}
          />
        </>
      ) : null}
      {ArrayConvert.map((value, index) => {
        if (index < headerData.length) {
          //Only used for image with status
          let enabled
          if (imageStatusNeeded) {
            enabled = rowData.enabled
          }

          if (hasAvatar && index === 0) {
            if (
              headerData[index] === 'Avatar' ||
              headerData[index] === 'Image' ||
              headerData[index] === 'Logo'
            ) {
              return (
                <React.Fragment key={index}>
                  <Core.Text weight="500" id="data">
                    {headerData[index]}
                  </Core.Text>
                  {imageStatusNeeded ? (
                    <ImageWithStatus
                      id="data"
                      src={value}
                      alt="user avatar"
                      active={imageStatusNeeded ? enabled : null}
                      firstName={title === 'Users' ? ArrayConvert[1] : 'U'}
                      lastName={title === 'Users' ? ArrayConvert[2] : 'D'}
                    />
                  ) : (
                    <Content.Avatar
                      key={index}
                      size="medium"
                      src={value}
                      firstName={
                        title === 'Organisations' ||
                        title === 'Insurers' ||
                        title === 'Branches'
                          ? ArrayConvert[1]
                          : title === 'Accounts' || title === 'Notes'
                          ? ArrayConvert[1]
                          : title === 'Motor Risks'
                          ? ArrayConvert[2]
                          : 'U'
                      }
                      lastName={
                        title === 'Organisations' ||
                        title === 'Insurers' ||
                        title === 'Branches'
                          ? ArrayConvert[1]
                            ? ArrayConvert[1].split(' ')[1] ||
                              ArrayConvert[1].split('')[1]
                            : 'M'
                          : title === 'Accounts' || title === 'Notes'
                          ? ArrayConvert[1].split(' ')[1] ||
                            ArrayConvert[1].split('')[1]
                          : title === 'Motor Risks'
                          ? ArrayConvert[3]
                          : 'D'
                      }
                    />
                  )}
                </React.Fragment>
              )
            }
          } else if (
            (title === 'Policies' || title === 'Policy Selection') &&
            rowData.status !== undefined &&
            index === 2
          ) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                {value !== 'inactive' ? (
                  <Icons.CheckCircleRounded
                    style={{ color: Colours.green }}
                    key={index}
                  />
                ) : (
                  <Icons.CancelRoundedIcon
                    style={{ color: Colours.red }}
                    key={index}
                  />
                )}
              </React.Fragment>
            )
          } else if (
            title === 'Insureds on Policy' &&
            rowData.isMain !== undefined &&
            index === 3
          ) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <Core.Text
                  key={index}
                  size="sm"
                  id="data"
                  color={value === 'Yes' ? Colours.blue : Colours.text}
                  weight={value === 'Yes' ? '650' : '400'}
                >
                  {value}
                </Core.Text>{' '}
              </React.Fragment>
            )
          } else if (
            title === 'Emails' &&
            rowData.icon !== undefined &&
            index === 0
          ) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <Icons.MailRounded
                  style={{ color: Colours.blue }}
                  key={index}
                />
              </React.Fragment>
            )
          } else if (
            (title === 'Policies' || title === 'Policy Selection') &&
            rowData.expiredOn !== undefined &&
            index === 4
          ) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <Core.Text
                  key={index}
                  size="sm"
                  id="data"
                  color={
                    new Date(value) > new Date() ? Colours.green : Colours.red
                  }
                >
                  {value}
                </Core.Text>
              </React.Fragment>
            )
          } else if (title === 'Accounts' && (index === 4 || index === 3)) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <Core.Text
                  weight="600"
                  key={index}
                  size="sm"
                  id="data"
                  color={Colours.blue}
                >
                  {value}
                </Core.Text>
              </React.Fragment>
            )
          } else if (
            title === 'Slips' &&
            rowData.icon !== undefined &&
            index === 0
          ) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <Icons.DescriptionRoundedIcon
                  style={{ color: Colours.blue }}
                  key={index}
                />
              </React.Fragment>
            )
          } else if (title === 'Organisations' && index === 1) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <div
                  css={`
                    width: max-content;
                    @media (max-width: 376px) {
                      width: 150px;
                    }
                  `}
                >
                  <Core.Text
                    Contained
                    key={index}
                    size="sm"
                    id="data"
                    color={
                      value === 'ACTIVE' || value === 'SUSPENDED'
                        ? '#fff'
                        : Colours.text
                    }
                  >
                    {value}
                  </Core.Text>
                </div>
              </React.Fragment>
            )
          } else if (title === 'Organisations' && index === 2) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <div
                  css={`
                    background: ${value === 'ACTIVE'
                      ? Colours.green
                      : value === 'SUSPENDED'
                      ? Colours.orange
                      : value === 'CREATE_IN_PROGRESS'
                      ? Colours.blue
                      : 'inherit'};
                    width: max-content;
                    padding: 2px 5px;
                    border-radius: 25px;
                  `}
                >
                  <Core.Text
                    key={index}
                    size="sm"
                    id="data"
                    color={
                      value === 'ACTIVE' ||
                      value === 'SUSPENDED' ||
                      value === 'CREATE_IN_PROGRESS'
                        ? '#fff'
                        : Colours.text
                    }
                  >
                    {value}
                  </Core.Text>
                </div>{' '}
              </React.Fragment>
            )
          } else if (title === 'Organisations' && index === 4) {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <div
                  css={`
                    background: RGBA(38, 153, 251, 0.1);
                    padding: 5px;
                    border-radius: 25px;
                    width: max-content;
                    @media (max-width: 376px) {
                      width: 150px;
                    }
                  `}
                >
                  <Core.Text
                    Contained
                    key={index}
                    size="sm"
                    id="data"
                    color={
                      value === 'ACTIVE' || value === 'SUSPENDED'
                        ? '#fff'
                        : Colours.text
                    }
                  >
                    {value}
                  </Core.Text>
                </div>
              </React.Fragment>
            )
          } else {
            return (
              <React.Fragment key={index}>
                <Core.Text weight="500" id="data">
                  {headerData[index]}
                </Core.Text>
                <Core.Text id="data">{value}</Core.Text>
              </React.Fragment>
            )
          }
          return null
        }
        return null
      })}
      {/* Action Buttons */}
      {deleteAction || suspendAction || enableAction || editAction ? (
        <Core.Text weight="500" color={Colours.blue}>
          Actions
        </Core.Text>
      ) : null}
      <div
        css={`
          width: 100%;
          display: flex;
          align-content: center;
        `}
      >
        {editAction ? (
          <ActionButtonContainer action={editAction} data={rowData} id="edit">
            <Icons.EditRounded style={{ color: Colours.blue }} />
          </ActionButtonContainer>
        ) : null}
        {title === 'Organisations' ? (
          <>
            {enableAction && OrganisationStatus === 'SUSPENDED' ? (
              <ActionButtonContainer action={enableAction} dataSetId={id}>
                <Icons.PlayCircleOutlineRounded
                  style={{ color: Colours.green }}
                />
              </ActionButtonContainer>
            ) : null}
            {suspendAction && OrganisationStatus === 'ACTIVE' ? (
              <ActionButtonContainer action={suspendAction} dataSetId={id}>
                <Icons.PauseCircleOutlineRounded
                  style={{ color: Colours.orange }}
                />
              </ActionButtonContainer>
            ) : null}
          </>
        ) : null}
        {title === 'Users' ? (
          <>
            {enableAction && rowData.enabled === 0 ? (
              <ActionButtonContainer action={enableAction} dataSetId={id}>
                <Icons.PlayCircleOutlineRounded
                  style={{ color: Colours.green }}
                />
              </ActionButtonContainer>
            ) : null}
            {suspendAction && rowData.enabled ? (
              <ActionButtonContainer action={suspendAction} dataSetId={id}>
                <Icons.PauseCircleOutlineRounded
                  style={{ color: Colours.orange }}
                />
              </ActionButtonContainer>
            ) : null}
          </>
        ) : null}

        {deleteAction ? (
          <ActionButtonContainer action={deleteAction} noRight dataSetId={id}>
            <Icons.DeleteSweepRounded style={{ color: Colours.red }} />
          </ActionButtonContainer>
        ) : null}
      </div>
    </div>
  )
}
