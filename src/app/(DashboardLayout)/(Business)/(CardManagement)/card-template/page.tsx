'use client'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { slice } from 'lodash'
import Image from 'next/image'
import * as React from 'react'

import Breadcrumb from '@/app/(DashboardLayout)/(Resources)/layout/shared/breadcrumb/Breadcrumb'
import AddTemplateModal from '@/app/components/business/card-management/card-template/AddTemplateModal'
import { EditTemplateModal } from '@/app/components/business/card-management/card-template/EditTemplateModal'
import PageContainer from '@/app/components/container/PageContainer'
import CustomSwitch from '@/app/components/forms/theme-elements/CustomSwitch'
import BlankCard from '@/app/components/shared/BlankCard'
import LoadingElement from '@/app/components/ui-element/LoadingElement'
import { BLUR_IMAGE } from '@/constants/constant'
import useLoading from '@/hooks/useLoading'
import {
  deleteCardTemplate,
  editCardTemplate,
  getCardTemplates,
} from '@/store/business/cardManagement/actions'
import { useSelector } from '@/store/hooks'
import { dispatch } from '@/store/store'
import { ICardTemplate } from '@/types/cardManagement.type'

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

const CardTemplatePage = () => {
  const templates = useSelector(state => state.cardManagement.templates)
  const loading = useLoading('getCardTemplates')
  const [openAddModal, setOpenAddModal] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - templates.length) : 0

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Actions
  const handleDeleteTemplate = (id: string) => {
    dispatch(deleteCardTemplate(id))
  }
  const handleChangeStatusTemplate = (
    template: ICardTemplate,
    checked: boolean,
  ) => {
    dispatch(
      editCardTemplate({
        ...template,
        status: checked ? 'active' : 'inactive',
      }),
    )
  }

  React.useEffect(() => {
    dispatch(getCardTemplates())
  }, [])

  if (loading) {
    return <LoadingElement />
  }

  return (
    <PageContainer title="Card Template">
      {/* breadcrumb */}
      <Breadcrumb title="Card Template" />
      {/* end breadcrumb */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          py: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddModal(true)}
          sx={{
            minWidth: '100px',
          }}
        >
          Add
        </Button>
      </Box>

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
                  <Typography variant="h6">ID</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Image</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name of card</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Price</Typography>
                </TableCell>
                <TableCell width="100px" align="center">
                  <Typography variant="h6">Actions</Typography>
                </TableCell>
                <TableCell width="130px" align="center">
                  <Typography variant="h6">Active / In active</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? slice(
                    templates,
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : templates
              )?.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.id}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Image
                      src={row.image || BLUR_IMAGE}
                      height={80}
                      width={80}
                      placeholder={BLUR_IMAGE}
                      style={{
                        width: '80px',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                      alt="Template image"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.price}</Typography>
                  </TableCell>
                  <TableCell width="100px" align="center">
                    <IconButton
                      color="warning"
                      onClick={() => EditTemplateModal.open(row)}
                    >
                      <Tooltip title="Edit">
                        <IconPencil />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTemplate(row.id)}
                    >
                      <Tooltip title="Delete">
                        <IconTrash />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                  <TableCell width="130px" align="center">
                    <CustomSwitch
                      checked={row.status === 'active'}
                      sx={{ scale: '-1' }}
                      onChange={(event, checked) =>
                        handleChangeStatusTemplate(row, checked)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={templates.length}
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

      <Dialog open={openAddModal}>
        <AddTemplateModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      </Dialog>

      <EditTemplateModal.Component />
    </PageContainer>
  )
}

export default CardTemplatePage
