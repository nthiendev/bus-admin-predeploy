import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  Fade,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'
import { useFormik } from 'formik'
import { map, pick } from 'lodash'
import { createRef, useImperativeHandle, useState } from 'react'
import * as Yup from 'yup'

import useLoading from '@/hooks/useLoading'
import { updateCardRequest } from '@/store/business/cardManagement/actions'
import { dispatch } from '@/store/store'
import { ICardRequest } from '@/types/cardManagement.type'
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel'
import CustomTextField from '../../../forms/theme-elements/CustomTextField'
import ParentCard from '../../../shared/ParentCard'

const STATUS_LIST = ['pending', 'shipped'] as const

export namespace UpdateCardRequestModal {
  interface IUpdateCardRequestModalMethod {
    open: (request: ICardRequest) => void
  }

  const updateCardRequestModalRef = createRef<IUpdateCardRequestModalMethod>()

  export const open = (request: ICardRequest) =>
    updateCardRequestModalRef.current?.open(request)

  export function Component() {
    const loading = useLoading('updateCardRequest')
    const [open, setOpen] = useState(false)
    const [requestData, setCardRequestData] = useState<ICardRequest | null>(
      null,
    )

    const { handleSubmit, getFieldProps, getFieldMeta, setValues } = useFormik<
      Pick<ICardRequest, 'status' | 'ship_by' | 'ship_tracking' | 'note'>
    >({
      initialValues: {
        status: 'pending',
        ship_by: '',
        ship_tracking: '',
        note: '',
      },
      validationSchema: Yup.object().shape({
        status: Yup.string(),
        ship_by: Yup.string().required('Ship by is required!'),
        ship_tracking: Yup.string().required('Ship tracking is required!'),
        note: Yup.string(),
      }),
      onSubmit: values => {
        if (!requestData) return
        const payload = { ...requestData, ...values }
        console.log('payload', payload)

        dispatch(updateCardRequest(payload, () => setOpen(false)))
      },
    })

    const handleOpen = (request: ICardRequest) => {
      setOpen(true)
      setCardRequestData(request)
      setValues(pick(request, 'status', 'ship_by', 'ship_tracking', 'note'))
    }

    const handleClose = () => {
      setOpen(false)
    }

    useImperativeHandle(
      updateCardRequestModalRef,
      () => ({
        open: handleOpen,
      }),
      [],
    )

    return (
      <Dialog open={open} onClose={handleClose}>
        <Fade in={open}>
          <form style={{ minWidth: '500px' }} onSubmit={handleSubmit}>
            <ParentCard
              title="Update Request Template"
              footer={
                <Stack direction="row" spacing={1.5}>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Update
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Stack>
              }
            >
              <>
                <Box
                  sx={{
                    marginTop: '-25px',
                  }}
                >
                  <CustomFormLabel htmlFor="update-card-modal-status">
                    Status
                  </CustomFormLabel>
                  <Select
                    id="update-card-modal-status"
                    displayEmpty
                    fullWidth
                    {...getFieldProps('status')}
                  >
                    {map(STATUS_LIST, (s, i) => (
                      <MenuItem key={i} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <CustomFormLabel htmlFor="update-card-modal-ship-by">
                    Ship by
                  </CustomFormLabel>
                  <CustomTextField
                    id="update-card-modal-ship-by"
                    type="text"
                    variant="outlined"
                    fullWidth
                    meta={getFieldMeta('ship_by')}
                    {...getFieldProps('ship_by')}
                  />
                </Box>
                <Box>
                  <CustomFormLabel htmlFor="update-card-modal-ship-tracking">
                    Ship Tracking
                  </CustomFormLabel>
                  <CustomTextField
                    id="update-card-modal-ship_tracking"
                    type="text"
                    variant="outlined"
                    fullWidth
                    meta={getFieldMeta('ship_tracking')}
                    {...getFieldProps('ship_tracking')}
                  />
                </Box>
                <Box>
                  <CustomFormLabel htmlFor="update-card-modal-note">
                    Note
                  </CustomFormLabel>
                  <CustomTextField
                    id="update-card-modal-note"
                    type="text"
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={5}
                    meta={getFieldMeta('note')}
                    {...getFieldProps('note')}
                  />
                </Box>
              </>
            </ParentCard>
          </form>
        </Fade>
      </Dialog>
    )
  }
}
