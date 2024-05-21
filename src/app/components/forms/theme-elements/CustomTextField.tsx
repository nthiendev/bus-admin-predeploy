import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, TextField, TextFieldProps, Typography } from '@mui/material'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { FieldMetaProps } from 'formik'

interface ICustomTextFieldProps {
  meta?: FieldMetaProps<any>
}

const TextFieldStyled = styled((props: any) => <TextField {...props} />)(
  ({ theme }) => ({
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[200],
    },
    '& textarea': {
      padding: 0,
    },
  }),
)

const TypographyStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  gap: '6px',
  bottom: '-24px',
  left: 0,
  paddingTop: '8px',
  fontSize: '14px',
  transition: '1s ease',
  color: theme.palette.warning.main,
}))

export default function CustomTextField({
  meta,
  ...props
}: ICustomTextFieldProps & TextFieldProps) {
  return (
    <Box position="relative" width="100%" mb={0.5}>
      <TextFieldStyled {...props} />
      {meta?.touched && meta.error && (
        <TypographyStyled>
          <IconAlertTriangleFilled size={16} /> {meta.error}
        </TypographyStyled>
      )}
    </Box>
  )
}
