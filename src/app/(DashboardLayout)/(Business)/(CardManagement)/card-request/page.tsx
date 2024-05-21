'use client'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { IconFilter, IconNotes, IconPencil } from '@tabler/icons-react'
import { format } from 'date-fns'
import { map } from 'lodash'
import * as React from 'react'

import Breadcrumb from '@/app/(DashboardLayout)/(Resources)/layout/shared/breadcrumb/Breadcrumb'
import { UpdateCardRequestModal } from '@/app/components/business/card-management/card-request/UpdateCardRequestModal'
import PageContainer from '@/app/components/container/PageContainer'
import BlankCard from '@/app/components/shared/BlankCard'
import LoadingElement from '@/app/components/ui-element/LoadingElement'
import useLoading from '@/hooks/useLoading'
import { getCardRequests } from '@/store/business/cardManagement/actions'
import { useSelector } from '@/store/hooks'
import { dispatch } from '@/store/store'
import theme from '@/utils/theme'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

const STATUS_LIST = ['all', 'pending', 'shipped'] as const

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

const CardRequestPage = () => {
  const requests = useSelector(state => state.cardManagement.requests)
  const loading = useLoading('getCardRequests')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  // Filters
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [start, setStart] = React.useState<any | null>()
  const [end, setEnd] = React.useState<any | null>()
  const [search, setSearch] = React.useState<string>('')
  const [statusFilter, setStatusFilter] =
    React.useState<(typeof STATUS_LIST)[number]>('all')

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requests.length) : 0

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Filters
  const open = Boolean(anchorEl)
  const id = open ? 'card-request-filter-box' : undefined

  const handleOpenFilter = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseFilter = () => {
    setAnchorEl(null)
  }

  const handleStartDateChange = (newValue: any) => {
    setStart(newValue)
  }
  const handleEndDateChange = (newValue: any) => {
    setEnd(newValue)
  }

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(event.target.value as string)
  }

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as (typeof STATUS_LIST)[number])
  }

  // Handle get card request by filters
  React.useEffect(() => {
    console.log('Handle filtering...')
    console.log('search: ', search)
    console.log('status: ', statusFilter)
    console.log('start date: ', start)
    console.log('end date: ', end)

    dispatch(getCardRequests())
  }, [search, statusFilter, start, end])

  return (
    <PageContainer title="Card Request">
      {/* breadcrumb */}
      <Breadcrumb title="Card Request" />
      {/* end breadcrumb */}
      <Box sx={{ display: 'flex', columnGap: 1, py: 1.5, width: '300px' }}>
        <TextField
          id="search"
          value={search}
          placeholder="Search"
          size="medium"
          type="search"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
        />
        <Tooltip title="Filters">
          <IconButton aria-describedby={id} onClick={handleOpenFilter}>
            <IconFilter width={28} height={28} />
          </IconButton>
        </Tooltip>
      </Box>
      {/* Filters */}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
      >
        <BlankCard>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '20px',
              padding: 2,
            }}
          >
            <span>
              <Typography variant="h6" mb={1}>
                Status
              </Typography>
              <Select
                id="update-card-modal-status"
                displayEmpty
                sx={{ width: 'calc(50% - 4px)' }}
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                {map(STATUS_LIST, (s, i) => (
                  <MenuItem key={i} value={s} children={s} />
                ))}
              </Select>
            </span>

            <span>
              <Typography variant="h6" mb={1.8}>
                Range date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    height: '44px',
                    width: '400px',
                    mb: 1,
                  }}
                >
                  <DatePicker
                    label="Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={start}
                    onChange={handleStartDateChange}
                    renderInput={(params: any) => (
                      <TextField {...params} fullWidth sx={{ mb: 3 }} />
                    )}
                  />
                  <DatePicker
                    label="End Date"
                    inputFormat="MM/dd/yyyy"
                    value={end}
                    onChange={handleEndDateChange}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ mb: 3 }}
                        error={start > end}
                        helperText={
                          start > end
                            ? 'End date must be later than start date'
                            : ''
                        }
                      />
                    )}
                  />
                </Box>
              </LocalizationProvider>
            </span>
          </Box>
        </BlankCard>
      </Popover>
      {/* End filters */}

      <BlankCard>
        <TableContainer>
          {loading && (
            <LoadingElement
              sx={{
                height: '364.5px',
              }}
            />
          )}
          {!loading && (
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Request Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Request ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Customer ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Receiver Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Phone</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Address</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Postal</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Ship By</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Ship Tracking</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? requests.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : requests
                ).map(row => (
                  <TableRow key={row.request_id}>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {format(
                          new Date(row.request_date),
                          'dd MMM yyyy HH:mm',
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {row.request_id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {row.customer_id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {row.receiver_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.address}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {row.postal_code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{row.ship_by}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {row.ship_tracking}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={row.status === 'pending' ? 'warning' : 'success'}
                        size="small"
                        variant="outlined"
                        label={row.status}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          <Box
                            sx={{
                              padding: 1,
                            }}
                          >
                            <Typography variant="h6">Note:</Typography>
                            <Typography variant="body1">{row.note}</Typography>
                          </Box>
                        }
                      >
                        <IconButton>
                          <IconNotes color={theme.palette.secondary.main} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Update">
                        <IconButton
                          onClick={() => UpdateCardRequestModal.open(row)}
                        >
                          <IconPencil color={theme.palette.warning.main} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={12}
                    count={requests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    sx={{
                      '& .MuiTablePagination-spacer': {
                        flex: 0,
                      },
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </TableContainer>
      </BlankCard>
      <UpdateCardRequestModal.Component />
    </PageContainer>
  )
}

export default CardRequestPage
