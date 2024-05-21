import { loginType } from '@/app/(DashboardLayout)/(Resources)/types/auth/auth'
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox'
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import {
  Box,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

import useLoading from '@/hooks/useLoading'
import { dispatch } from '@/store/store'
import { LoadingButton } from '@mui/lab'
import { login } from '@/store/business/user/actions'

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter()
  const loading = useLoading('login')

  const { handleSubmit, getFieldProps, getFieldMeta } = useFormik({
    initialValues: {
      email: '',
      password: '',
      isRemember: true,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Please enter your email!')
        .email('Invalid email!'),
      password: Yup.string().required('Password is required!'),
      isRemember: Yup.boolean(),
    }),
    onSubmit: values => {
      console.log('values', values)
      dispatch(
        login(values, () => {
          router.replace('/')
        }),
      )
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box> */}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            meta={getFieldMeta('email')}
            {...getFieldProps('email')}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            meta={getFieldMeta('password')}
            {...getFieldProps('password')}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <CustomCheckbox
                  defaultChecked
                  {...getFieldProps('isRemember')}
                />
              }
              label="Remeber this Device"
            />
          </FormGroup>
          {/* <Typography
            component={Link}
            href="/auth/auth1/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography> */}
        </Stack>
      </Stack>
      <Box>
        <LoadingButton
          loading={loading}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign In
        </LoadingButton>
      </Box>
      {subtitle}
    </form>
  )
}

export default AuthLogin
