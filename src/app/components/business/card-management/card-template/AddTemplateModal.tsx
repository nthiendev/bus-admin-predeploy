import {
  Box,
  Button,
  Dialog,
  Fade,
  Stack,
  alpha,
  useTheme,
} from '@mui/material'
import { IconCamera } from '@tabler/icons-react'
import { useFormik } from 'formik'
import Image from 'next/image'
import { useState } from 'react'
import * as Yup from 'yup'

import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel'
import CustomTextField from '../../../forms/theme-elements/CustomTextField'
import ParentCard from '../../../shared/ParentCard'
import { dispatch } from '@/store/store'
import { addCardTemplate } from '@/store/business/cardManagement/actions'
import useLoading from '@/hooks/useLoading'
import { LoadingButton } from '@mui/lab'

interface IAddTemplateModalProps {
  open: boolean
  onClose: () => void
}

export default function AddTemplateModal({
  open,
  onClose,
}: IAddTemplateModalProps) {
  const theme = useTheme()
  const loading = useLoading('addCardTemplate')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const { handleSubmit, getFieldProps, getFieldMeta } = useFormik({
    initialValues: {
      name: '',
      price: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name of Card is required!'),
      price: Yup.number().required('Price is required!'),
    }),
    onSubmit: values => {
      const payload = {
        image:
          'https://busnotipublicmedia.s3.ap-southeast-2.amazonaws.com/media/20240508015403.jpeg',
        ...values,
      }
      console.log('payload', payload)

      if (selectedFile) {
        const formData = new FormData()
        formData.append('image', selectedFile)
        console.log('formData', formData)
      }

      dispatch(addCardTemplate(payload, onClose))
    },
  })

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <Fade in={open} unmountOnExit>
      <form style={{ minWidth: '500px' }} onSubmit={handleSubmit}>
        <ParentCard
          title="Add Card Template"
          footer={
            <Stack direction="row" spacing={1.5}>
              <LoadingButton
                loading={loading}
                type="submit"
                color="primary"
                variant="contained"
              >
                Add
              </LoadingButton>
              <Button variant="contained" color="error" onClick={onClose}>
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
              <CustomFormLabel htmlFor="name">Name of Card</CustomFormLabel>
              <CustomTextField
                id="name"
                type="text"
                variant="outlined"
                fullWidth
                meta={getFieldMeta('name')}
                {...getFieldProps('name')}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="price">Price</CustomFormLabel>
              <CustomTextField
                id="price"
                type="number"
                variant="outlined"
                fullWidth
                meta={getFieldMeta('price')}
                {...getFieldProps('price')}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="image">Image</CustomFormLabel>
              <Box
                sx={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  overflow: 'hidden',
                  mt: 1,
                  borderRadius: '6px',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {preview && (
                  <Image
                    src={preview}
                    width={80}
                    style={{
                      width: '80px',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                    alt="Template image"
                  />
                )}
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 999,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '24px',
                    borderRadius: 0,
                    bgcolor: alpha(theme.palette.grey[600], 0.8),
                  }}
                >
                  <IconCamera
                    color={theme.palette.primary.main}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      document.getElementById('file-input')?.click()
                    }
                  />
                </Box>
              </Box>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Box>
          </>
        </ParentCard>
      </form>
    </Fade>
  )
}
