import React, { useState, useContext, useEffect } from 'react'
import 'styled-components/macro'
import { Core, Icons, FormControl, Loading } from 'components'
import Header from './Header'
import Row from './Row'
import HybridContainer from './HybridContainer'
import Footer from './Footer'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import EmptyTablePlaceHolder from 'assets/emptyTable.png'
import { MassAction } from './modals'
import { ColourContext } from '../../context'

const queryString = require('query-string')

/**
 * A component for creating text using standard scales .
 * @prop {string} title - Title for table.
 * @prop {string} searchPlaceholder - placeholder for search box for table.
 * @prop {string} buttonTitle - Title for main button on table.
 * @prop {function} deleteAction - function to execute when delete button is clicked.
 * @prop {function} suspendAction - function to execute when suspend button is clicked.
 * @prop {function} enableAction - function to execute when enable button is clicked.
 * @prop {function} editAction - function to execute when edit button is clicked.
 * @prop {function} rowClick - function to execute when a row is clicked.
 * @prop {function} deleteMultipleAction - function to execute when a deleting multiple.
 * @prop {function} suspendMultipleAction - function to execute when Suspending multiple.
 * @prop {function} enableMultipleAction - function to execute when enabling multiple.
 * @prop {function} searchHandler - function to execute table search.
 * @prop {array} HeaderData - Header columns.
 * @prop {array of ORDERED objects} RowData - Array of objects that is ordered based on the order of the header, since index is used.
 * @prop {boolean} searchEnable - controls if table will have a search field.
 * @prop {boolean} hasAvatar - does the data set contains an image/Avatar - reserve words.
 * @prop {boolean} imageStatusNeeded - if avatar exists, is a regular image required or is a image with status needed
 * @prop {boolean} checkBoxNeeded - Are Checkboxes required.
 * @prop {boolean} rowborderSeperatoin - Are row border seperation needed in responsive view.
 * @prop {string} Columns - Since Grid is used, template is required to format table.
 * @prop {string} alignment - Determines vertical alignment of the table.
 * @prop {string} justify - Determines horizontal justification of the table.
 * @prop {string} breakingPoint - Determines the screen width at which responsive view changes.
 * @prop {string} noTop - Determines If the table should have a title section at the top.
 * @prop {string} noTopButton - Determines If the table should have a Button in the title section at the top.
 * @prop {string} MainButtonpath - Determines what path should be pushed when the main title button is clicked.
 * @prop {boolean} massLoading - Determines if mass action is still being executed.
 * @prop {boolean} massError - Determines if mass action threw an error.
 * @prop {boolean} slipNeeded - Determines if there should be a slip button.
 * @prop {boolean} squeeze - Minimize footer content.
 * @prop {boolean} Searching - searching table data.
 */

export default function ({
  title = 'Title',
  searchPlaceholder = 'Search Items',
  buttonTitle = 'Click Me',
  MainButtonpath,
  deleteAction = false,
  suspendAction = false,
  enableAction = false,
  editAction = false,
  HeaderData = [],
  RowData = [],
  searchEnable = false,
  searchHandler = () => {},
  Searching,
  hasAvatar = false,
  imageStatusNeeded = false,
  Columns = `50px 1fr 1fr 1fr 2fr`,
  checkBoxNeeded = false,
  rowClick = () => {},
  alignment = 'center',
  justify = 'center',
  rowborderSeperatoin = false,
  breakingPoint = '769px',
  noTop = false,
  noTopButton = false,
  slipNeeded = false,
  disableMultiAction = false,
  deleteMultipleAction = false,
  suspendMultipleAction = false,
  enableMultipleAction = false,
  massLoading,
  massError,
  squeeze,
}) {
  const { Colours } = useContext(ColourContext)
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const template = JSON.parse(localStorage.getItem('template')) || []
  const [selectedRows, setSelectedRow] = useState({ rows: [] })
  const [pagination, setPagination] = useState({ start: 0, end: 10 })
  const [selectedAllRow, setSelectedAllRow] = useState(false)
  const [query, setQuery] = useState('')

  let toolTip =
    template.length === 0 && buttonTitle === 'Generate Slip'
      ? {
          'aria-label': 'No Template Found',
          'data-balloon-pos': 'left',
        }
      : template.length !== 0 &&
        selectedRows.rows.length < 1 &&
        buttonTitle === 'Generate Slip'
      ? {
          'aria-label': 'No Policy Selected',
          'data-balloon-pos': 'left',
        }
      : null

  let toolTip1 =
    template.length === 0 && title === 'Policies'
      ? {
          'aria-label': 'No Template Found',
          'data-balloon-pos': 'left',
        }
      : template.length !== 0 &&
        selectedRows.rows.length < 1 &&
        title === 'Policies'
      ? {
          'aria-label': 'No Policy Selected',
          'data-balloon-pos': 'left',
        }
      : null

  useEffect(() => {
    if (selectedRows.rows.length === RowData.length) setSelectedAllRow(true)
    else setSelectedAllRow(false)
  }, [selectedRows.rows.length, RowData.length])

  const Buttons = () =>
    noTopButton ? null : (
      <div
        css={`
          display: grid;
          grid-template-columns: ${slipNeeded ? '1fr 1fr' : '1fr'};
          grid-column-gap: 10px;
          @media (max-width: 376px) {
            grid-template-columns: 1fr;
            grid-gap: 10px;
          }
        `}
      >
        {title === 'Policies' && slipNeeded ? (
          <Core.Button
            bgColour={Colours.green}
            onClick={() => {
              if (title === 'Policies' && slipNeeded) {
                const policyIds = queryString.stringify({
                  policies: selectedRows.rows,
                })
                history.push(
                  `/broker/account/slips/${accountId}/slip-generation/${accountId}/?${policyIds}`
                )
              }
            }}
            disabled={
              (slipNeeded && template.length === 0) ||
              selectedRows.rows.length < 1
            }
            {...toolTip1}
          >
            Generate Slip
          </Core.Button>
        ) : null}
        <Core.Button
          bgColour={Colours.green}
          onClick={() => {
            if (title === 'Policy Selection') {
              const policyIds = queryString.stringify({
                policies: selectedRows.rows,
              })
              history.push(
                `/broker/account/slips/${accountId}/slip-generation/${accountId}/?${policyIds}`
              )
            } else history.push(MainButtonpath)
          }}
          disabled={
            (title === 'Policy Selection' && template.length === 0) ||
            (title === 'Policy Selection' && selectedRows.rows.length < 1)
          }
          {...toolTip}
        >
          {buttonTitle}
        </Core.Button>
      </div>
    )

  return (
    <div
      css={`
        height: calc(100% - 2px);
        width: calc(100% - 2px);
        border-radius: 5px;
        border: 1px solid ${Colours.border};
        display: grid;
        grid-template-rows: ${noTop
          ? 'max-content 1fr max-content'
          : 'max-content max-content 1fr max-content'};
        @media (max-width: ${breakingPoint}) {
          height: calc(100% - 12px);
          grid-template-rows: ${noTop ? '1fr 50px' : 'max-content 1fr 50px'};
        }
        overflow-y: auto;
      `}
    >
      {noTop ? null : (
        <div
          css={`
            display: ${noTopButton ? 'flex' : 'grid'};
            grid-template-columns: ${noTopButton
              ? 'max-content 1fr'
              : slipNeeded
              ? 'max-content 1fr max-content'
              : 'max-content 1fr max-content'};
            @media (max-width: ${breakingPoint}) {
              grid-template-columns: ${noTopButton
                ? 'max-content 1fr'
                : 'max-content 1fr max-content'};
              margin-bottom: ${noTopButton ? '0px' : '10px'};
            }
            grid-gap: 20px;
            align-items: center;
            padding: 10px;
            background: ${Colours.title};
            border-bottom: 1px solid ${Colours.border};
          `}
        >
          <Core.Text weight="600">{title}</Core.Text>
          {searchEnable ? (
            <FormControl.InputWithImage
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              action={() => {
                if (query === '') searchHandler({ variables: { query: '*' } })
                else searchHandler({ variables: { query } })
              }}
            />
          ) : (
            <div />
          )}
          <div
            css={`
              @media (min-width: 376px) {
                display: none;
              }
              @media (max-width: 376px) {
                display: visible;
              }
              &:hover {
                cursor: pointer;
              }
            `}
          >
            <Core.Dropdown
              x={'-110px'}
              width="max-content"
              items={[
                {
                  type: 'any',
                  component: <Buttons />,
                },
              ]}
            >
              <Core.Box mg="0px" color="#111">
                <Icons.MoreVert style={{ color: Colours.blue }} />
              </Core.Box>
            </Core.Dropdown>
          </div>
          <div
            css={`
              display: visible;
              @media (max-width: 376px) {
                display: grid;
                grid-row-gap: 10px;
                display: none;
              }
              @media (min-width: 376px) {
                display: flex;
                grid-gap: 10px;
              }
            `}
          >
            {noTopButton ? null : (
              <div
                css={`
                  display: grid;
                  grid-template-columns: ${slipNeeded ? '1fr 1fr' : '1fr'};
                  grid-column-gap: 10px;
                `}
              >
                {title === 'Policies' && slipNeeded ? (
                  <Core.Button
                    bgColour={Colours.green}
                    onClick={() => {
                      if (title === 'Policies' && slipNeeded) {
                        const policyIds = queryString.stringify({
                          policies: selectedRows.rows,
                        })
                        history.push(
                          `/broker/account/slips/${accountId}/slip-generation/${accountId}/?${policyIds}`
                        )
                      }
                    }}
                    disabled={
                      (slipNeeded && template.length === 0) ||
                      selectedRows.rows.length < 1
                    }
                    {...toolTip1}
                  >
                    Generate Slip
                  </Core.Button>
                ) : null}
                <Core.Button
                  bgColour={Colours.blue}
                  onClick={() => {
                    if (title === 'Policy Selection') {
                      const policyIds = queryString.stringify({
                        policies: selectedRows.rows,
                      })
                      history.push(
                        `/broker/account/slips/${accountId}/slip-generation/${accountId}/?${policyIds}`
                      )
                    } else history.push(MainButtonpath)
                  }}
                  disabled={
                    (title === 'Policy Selection' && template.length === 0) ||
                    (title === 'Policy Selection' &&
                      selectedRows.rows.length < 1)
                  }
                  {...toolTip}
                >
                  {buttonTitle}
                </Core.Button>
              </div>
            )}
          </div>
        </div>
      )}

      <Header
        data={HeaderData}
        rowData={RowData}
        deleteAction={deleteAction}
        enableAction={enableAction}
        suspendAction={suspendAction}
        editAction={editAction}
        Columns={Columns}
        checkBoxNeeded={checkBoxNeeded}
        setSelectedAllRow={setSelectedAllRow}
        setSelectedRow={setSelectedRow}
        selectedRows={selectedRows}
        justify={justify}
        breakingPoint={breakingPoint}
      />
      {RowData.length > 0 ? (
        <div
          css={`
            height: calc(100% - 10px);
            overflow-y: auto;
            padding: 0px 10px;
            @media (max-width: ${breakingPoint}) {
              padding-top: 5px;
            }
          `}
        >
          {Searching && <Loading small />}
          {RowData.map((value, index) =>
            index >= pagination.start && index < pagination.end ? (
              <Row
                data={value}
                title={title}
                HeaderData={HeaderData}
                deleteAction={deleteAction}
                enableAction={enableAction}
                suspendAction={suspendAction}
                editAction={editAction}
                hasAvatar={hasAvatar}
                imageStatusNeeded={imageStatusNeeded}
                Columns={Columns}
                key={index}
                checkBoxNeeded={checkBoxNeeded}
                selectedAllRow={selectedAllRow}
                setSelectedRow={setSelectedRow}
                rowClick={rowClick}
                justify={justify}
                alignment={alignment}
                setSelectedAllRow={setSelectedAllRow}
                rawRowData={RowData}
                selectedRows={selectedRows}
                breakingPoint={breakingPoint}
              />
            ) : null
          )}
          {RowData.map((value, index) =>
            index >= pagination.start && index < pagination.end ? (
              <HybridContainer
                rowData={value}
                headerData={HeaderData}
                key={index}
                deleteAction={deleteAction}
                enableAction={enableAction}
                suspendAction={suspendAction}
                editAction={editAction}
                hasAvatar={hasAvatar}
                imageStatusNeeded={imageStatusNeeded}
                rowClick={rowClick}
                rowborderSeperatoin={rowborderSeperatoin}
                title={title}
                breakingPoint={breakingPoint}
                selectedRows={selectedRows}
                selectedAllRow={selectedAllRow}
                setSelectedRow={setSelectedRow}
                checkBoxNeeded={checkBoxNeeded}
              />
            ) : null
          )}
        </div>
      ) : (
        <div
          css={`
            width: 100%;
            height: 100%;
            display: grid;
            place-items: Center;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-rows: 150px max-content;
              width: max-content;
              height: max-content;
              justify-items: Center;
            `}
          >
            <img src={EmptyTablePlaceHolder} alt="placeholder" height="120px" />
            <Core.Text weight="400" customSize="20px" color={Colours.inactive}>
              No Data Yet
            </Core.Text>
          </div>
        </div>
      )}
      <Footer
        deleteMultipleAction={deleteMultipleAction}
        suspendMultipleAction={suspendMultipleAction}
        enableMultipleAction={enableMultipleAction}
        disableMultiAction={disableMultiAction}
        data={RowData}
        setSelectedRow={setSelectedRow}
        pagination={pagination}
        selectedRows={selectedRows}
        setPagination={setPagination}
        title={title}
        squeeze={squeeze}
      />
      <MassAction
        isShowing={
          action === 'massDelete' ||
          action === 'massSuspend' ||
          action === 'massEnable'
        }
        loading={massLoading}
        error={massError}
        title={title}
        deleteMultipleAction={deleteMultipleAction}
        enableMultipleAction={enableMultipleAction}
        suspendMultipleAction={suspendMultipleAction}
        ids={selectedRows.rows}
        setSelectedRow={setSelectedRow}
      />
    </div>
  )
}
