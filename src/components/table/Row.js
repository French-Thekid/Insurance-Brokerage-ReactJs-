import React, { useContext } from 'react'
import 'styled-components/macro'
import { Core, Icons, ImageWithStatus, Content } from 'components'
import ActionButtonContainer from './ActionButtonContainer'
import Checkbox from './Checkbox'
import { currencyFormatter } from 'utils'
import { ColourContext } from '../../context'

export default function ({
  data = [],
  Columns = '1fr',
  HeaderData = [],
  deleteAction = false,
  suspendAction = false,
  enableAction = false,
  editAction = false,
  hasAvatar = false,
  imageStatusNeeded = false,
  checkBoxNeeded,
  selectedAllRow,
  setSelectedRow,
  rowClick,
  justify,
  alignment,
  selectedRows,
  breakingPoint,
  title,
}) {
  const { Colours } = useContext(ColourContext)
  if (checkBoxNeeded) {
    Columns = '45px ' + Columns
  }

  if (deleteAction || enableAction || suspendAction || editAction) {
    Columns = Columns + ' 90px'
  }

  const id = data.id

  const ArrayConvert = Object.keys(data).map((key) => {
    return data[key]
  })

  const OrganisationStatus = data.status

  let endDate = new Date()
  if (title === 'Policies') {
    endDate = data.endDate
  }

  let mode = localStorage.getItem('Theme') || ''

  return (
    <div
      id="Parent"
      css={`
        width: 100%;
        height: max-content;
        @media (max-width: ${breakingPoint}) {
          display: none;
        }
        display: grid;
        grid-template-columns: ${Columns};
        border-bottom: 1px solid
          ${selectedRows.rows.includes(data.id)
            ? Colours.foreground
            : Colours.border};
        justify-items: ${justify};
        grid-column-gap: 10px;
        align-items: ${alignment};
        padding: 8px 0px;
        background: ${selectedRows.rows.includes(data.id)
          ? mode === 'Dark'
            ? Colours.background
            : '#ECF6FF'
          : 'none'};
        transform: ${selectedRows.rows.includes(data.id)
          ? 'translateY(-1px)'
          : 'none'};
        &:hover {
          background: ${selectedRows.rows.includes(data.id)
            ? mode === 'Dark'
              ? Colours.background
              : '#ECF6FF'
            : Colours.hover};
          cursor: ${rowClick.toString() === '() => {}' ? 'arrow' : 'pointer'};
          border-left: 1px solid ${Colours.border};
          border-right: 1px solid ${Colours.border};
          transition: ease-out 0.1s;
          transform: translateY(-1px);
        }
      `}
      onClick={(event) => {
        if (event.target.id === 'Parent' || event.target.id === 'data') {
          if (rowClick) {
            if (title === 'Documents' || title === 'Slips')
              rowClick(id, data.url)
            else if (
              title === 'Organisations' ||
              title === 'Insurers' ||
              title === 'Accounts' ||
              title === 'Motor Risks' ||
              title === 'Property Risks' ||
              title === 'Risks' ||
              title === 'Policies' ||
              title === 'Policy Versions' ||
              title === 'Roles'
            )
              rowClick(id, data)
            else rowClick(id)
          } else console.log('No action Present')
        }
      }}
    >
      {checkBoxNeeded ? (
        <Checkbox
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
      ) : null}
      {ArrayConvert.map((value, index) => {
        if (index < HeaderData.length) {
          let avatarFound = false
          if (
            HeaderData[index] === 'Avatar' ||
            HeaderData[index] === 'Image' ||
            HeaderData[index] === 'Logo'
          )
            avatarFound = true
          const enabled = data.enabled
          if (hasAvatar && index === 0) {
            if (avatarFound) {
              return imageStatusNeeded ? (
                <ImageWithStatus
                  key={index}
                  src={value}
                  alt="user avatar"
                  active={imageStatusNeeded ? enabled : null}
                  id="data"
                  firstName={title === 'Users' ? ArrayConvert[1] : 'U'}
                  lastName={title === 'Users' ? ArrayConvert[2] : 'D'}
                  size="medium"
                />
              ) : (
                <Content.Avatar
                  shadow
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
                      : title === 'Motor Risks' || title === 'Risks'
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
                      : title === 'Motor Risks' || title === 'Risks'
                      ? ArrayConvert[3]
                      : 'D'
                  }
                />
              )
            }
          } else if (
            title === 'Emails' &&
            data.icon !== undefined &&
            index === 0
          ) {
            return (
              <Icons.MailRounded style={{ color: Colours.blue }} key={index} />
            )
          } else if (title === 'Documents' && index === 0) {
            return (
              <Core.Text
                color={
                  selectedRows.rows.includes(data.id)
                    ? Colours.blue
                    : Colours.text
                }
                key={index}
                size="rg"
                id="data"
                Contained
                width="100%"
                customSize="13px"
              >
                {value}
              </Core.Text>
            )
          } else if (
            (title === 'Policies' || title === 'Policy Selection') &&
            data.expiredOn !== undefined &&
            index === 4
          ) {
            return (
              <Core.Text
                key={index}
                size="rg"
                id="data"
                color={
                  selectedRows.rows.includes(data.id)
                    ? Colours.blue
                    : new Date(value) > new Date()
                    ? Colours.green
                    : Colours.red
                }
              >
                {value}
              </Core.Text>
            )
          } else if (
            (title === 'Extension' || title === 'Limit') &&
            index === 1
          ) {
            return (
              <Core.Text key={index} size="rg" id="data" color={Colours.blue}>
                ${currencyFormatter(value)}
              </Core.Text>
            )
          } else if (title === 'Accounts' && index === 3) {
            return (
              <Core.Text
                weight="600"
                key={index}
                size="rg"
                id="data"
                color={Colours.blue}
              >
                {value}
              </Core.Text>
            )
          } else if (title === 'Accounts' && index === 4) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: calc(100% - 20px);
                  border: 1px solid ${Colours.blue};
                `}
              >
                <Core.Text
                  align={justify || 'center'}
                  width="100%"
                  Contained
                  color={Colours.blue}
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            title === 'Policy Selection' &&
            data.status !== undefined &&
            index === 2
          ) {
            return value !== 'inactive' ? (
              <Icons.CheckCircleRounded
                style={{ color: Colours.green }}
                key={index}
              />
            ) : (
              <Icons.CancelRoundedIcon
                style={{ color: Colours.red }}
                key={index}
              />
            )
          } else if (
            title === 'Policies' &&
            data.status !== undefined &&
            index === 2
          ) {
            return value !== 'inactive' && new Date(endDate) > new Date() ? (
              <Icons.CheckCircleRounded
                style={{ color: Colours.green }}
                key={index}
              />
            ) : (
              <Icons.CancelRoundedIcon
                style={{ color: Colours.red }}
                key={index}
              />
            )
          } else if (
            (title === 'Policies' || title === 'Notes') &&
            data.status !== undefined &&
            index === 1
          ) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: 80px;
                  border: 1px solid
                    ${value === 'Motor' ? Colours.blue : Colours.green};
                `}
              >
                <Core.Text
                  color={value === 'Motor' ? Colours.blue : Colours.green}
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            (title === 'Motor Risks' || title === 'Risks') &&
            index === 1
          ) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: 80px;
                  border: 1px solid ${Colours.blue};
                `}
              >
                <Core.Text color={Colours.blue}>{value}</Core.Text>
              </div>
            )
          } else if (
            (title === 'Motor Risks' || title === 'Risks') &&
            index === 5
          ) {
            return (
              <Core.Text color={Colours.blue}>
                {currencyFormatter(value)}
              </Core.Text>
            )
          } else if (
            (title === 'Risks' && index === 7) ||
            (title === 'Property Risks' && index === 5)
          ) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: 80px;
                  border: 1px solid
                    ${value === 'Persist' ? Colours.blue : Colours.red};
                `}
              >
                <Core.Text
                  color={value === 'Persist' ? Colours.blue : Colours.red}
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            title === 'Insureds on Policy' &&
            data.isMain !== undefined &&
            index === 3
          ) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: 50px;
                  border: 1px solid
                    ${value === 'Yes' ? Colours.blue : Colours.red};
                `}
              >
                <Core.Text color={value === 'Yes' ? Colours.blue : Colours.red}>
                  {value}
                </Core.Text>
              </div>
            )
          } else if (
            title === 'Insureds' &&
            data.isMain !== undefined &&
            index === 4
          ) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: 50px;
                  border: 1px solid
                    ${value === 'Yes' ? Colours.blue : Colours.red};
                `}
              >
                <Core.Text color={value === 'Yes' ? Colours.blue : Colours.red}>
                  {value}
                </Core.Text>
              </div>
            )
          } else if (title === 'Slips' && index === 1) {
            return (
              <div
                css={`
                  display: grid;
                  place-items: center;
                  padding: 5px 10px;
                  border-radius: 5px;
                  width: 80px;
                  border: 1px solid ${Colours.blue};
                `}
              >
                <Core.Text color={Colours.blue}>
                  {value.toUpperCase()}
                </Core.Text>
              </div>
            )
          } else if (
            title === 'Slips' &&
            data.icon !== undefined &&
            index === 0
          ) {
            return (
              <Icons.DescriptionRoundedIcon
                style={{ fontSize: '40px', color: Colours.blue }}
                key={index}
              />
            )
          } else if (title === 'Organisations' && index === 4) {
            return (
              <div
                css={`
                  padding: 5px;
                  width: 175px;
                  border: 1px solid
                    ${value === 'ACTIVE'
                      ? Colours.green
                      : value === 'SUSPENDED'
                      ? Colours.orange
                      : value === 'CREATE_IN_PROGRESS'
                      ? Colours.blue
                      : value === 'CREATE_FAILED'
                      ? Colours.red
                      : 'inherit'};
                  border-radius: 5px;
                  display: grid;
                  place-items: center;
                `}
              >
                <Core.Text
                  id="data"
                  size="rg"
                  color={
                    value === 'ACTIVE'
                      ? Colours.green
                      : value === 'SUSPENDED'
                      ? Colours.orange
                      : value === 'CREATE_IN_PROGRESS'
                      ? Colours.blue
                      : value === 'CREATE_FAILED'
                      ? Colours.red
                      : 'inherit'
                  }
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else if (title === 'Users' && index === 4) {
            return (
              <div
                css={`
                  padding: 5px;
                  width: 175px;
                  border: 1px solid ${Colours.blue};
                  border-radius: 5px;
                  display: grid;
                  place-items: center;
                `}
              >
                <Core.Text id="data" size="rg" color={Colours.blue}>
                  {value}
                </Core.Text>
              </div>
            )
          } else if (title === 'Organisations' && index === 3) {
            return (
              <div
                key={index}
                css={`
                  background: ${mode === 'Dark' ? Colours.title : '#ecf6ff'};
                  padding: 10px;
                  border-radius: 5px;
                  min-width: 270px;
                  display: grid;
                  place-items: Center;
                `}
              >
                <Core.Text
                  key={index}
                  size="rg"
                  id="data"
                  color={
                    selectedRows.rows.includes(data.id)
                      ? Colours.blue
                      : value === 'ACTIVE' || value === 'SUSPENDED'
                      ? '#fff'
                      : Colours.text
                  }
                >
                  {value}
                </Core.Text>
              </div>
            )
          } else {
            return (
              <Core.Text
                color={
                  selectedRows.rows.includes(data.id)
                    ? Colours.blue
                    : Colours.text
                }
                key={index}
                size="rg"
                id="data"
                Contained
                align={justify || 'center'}
                width="100%"
              >
                {value}
              </Core.Text>
            )
          }
        }
        return null
      })}
      <div
        css={`
          width: 100%;
          display: flex;
          align-content: center;
          justify-content: Center;
          opacity: ${selectedRows.rows.length > 1 ? 0.3 : 1};
        `}
        id="ActionButtons"
      >
        {OrganisationStatus !== 'CREATE_IN_PROGRESS' &&
        OrganisationStatus !== 'CREATE_FAILED' &&
        data.name !== 'Supreme Administrator' &&
        editAction ? (
          <ActionButtonContainer
            numOfRows={selectedRows.rows.length}
            action={editAction}
            data={data}
            id="edit"
          >
            <Icons.EditRounded style={{ color: Colours.blue }} />
          </ActionButtonContainer>
        ) : null}
        {title === 'Organisations' ? (
          <>
            {enableAction && OrganisationStatus === 'SUSPENDED' ? (
              <ActionButtonContainer
                numOfRows={selectedRows.rows.length}
                action={enableAction}
                dataSetId={id}
              >
                <Icons.PlayCircleOutlineRounded
                  style={{ color: Colours.green }}
                />
              </ActionButtonContainer>
            ) : null}
            {suspendAction && OrganisationStatus === 'ACTIVE' ? (
              <ActionButtonContainer
                numOfRows={selectedRows.rows.length}
                action={suspendAction}
                dataSetId={id}
              >
                <Icons.PauseCircleOutlineRounded
                  style={{ color: Colours.orange }}
                />
              </ActionButtonContainer>
            ) : null}
          </>
        ) : null}
        {title === 'Users' ? (
          <>
            {enableAction && data.enabled === 0 ? (
              <ActionButtonContainer
                numOfRows={selectedRows.rows.length}
                action={enableAction}
                dataSetId={id}
              >
                <Icons.PlayCircleOutlineRounded
                  style={{ color: Colours.green }}
                />
              </ActionButtonContainer>
            ) : null}
            {suspendAction && data.enabled ? (
              <ActionButtonContainer
                numOfRows={selectedRows.rows.length}
                action={suspendAction}
                dataSetId={id}
              >
                <Icons.PauseCircleOutlineRounded
                  style={{ color: Colours.orange }}
                />
              </ActionButtonContainer>
            ) : null}
          </>
        ) : null}

        {OrganisationStatus !== 'CREATE_IN_PROGRESS' &&
        data.name !== 'Supreme Administrator' &&
        deleteAction ? (
          <ActionButtonContainer
            numOfRows={selectedRows.rows.length}
            action={deleteAction}
            noRight
            dataSetId={id}
          >
            <Icons.DeleteSweepRounded style={{ color: Colours.red }} />
          </ActionButtonContainer>
        ) : null}
      </div>
    </div>
  )
}
