

'use client'
import * as React from 'react'

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

import Breadcrumb from '@/app/(DashboardLayout)/(Resources)/layout/shared/breadcrumb/Breadcrumb'
import PageContainer from '@/app/components/container/PageContainer'

import BlankCard from '@/app/components/shared/BlankCard'
import LoadingElement from '@/app/components/ui-element/LoadingElement'
import useLoading from '@/hooks/useLoading'
import { getCustomers, getSchoolList } from '@/store/business/userManagement/actions'
import { useSelector } from '@/store/hooks'
import { dispatch } from '@/store/store'
import { format } from 'date-fns'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

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

const BusCompanyListPage = () => {
  const schools = useSelector(state => state.userManagement.schools)
  const loading = useLoading('getCustomers')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - schools.length) : 0

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  React.useEffect(() => {
    dispatch(getSchoolList())
  }, [])

  if (loading) {
    return <LoadingElement />
  }

  return (
    <PageContainer title="School List">
      {/* breadcrumb */}
      <Breadcrumb title="School List" />
      {/* end breadcrumb */}
      <BlankCard>
        <TableContainer>
          <Table
            aria-label="custom pagination table"
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Id</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name-en</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name-cn</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? schools.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : schools
              ).map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.name_en}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                    >
                      {row.name_cn}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={schools.length}
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
        </TableContainer>
      </BlankCard>
    </PageContainer>
  )
}

export default BusCompanyListPage
