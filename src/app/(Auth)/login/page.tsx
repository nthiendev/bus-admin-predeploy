'use client'
import { Box, Card, Grid, Stack } from '@mui/material'

// components
import Logo from '@/app/(DashboardLayout)/(Resources)/layout/shared/logo/Logo'
import AuthLogin from '@/app/auth/authForms/AuthLogin'
import PageContainer from '@/app/components/container/PageContainer'

export default function LoginPage() {
  return (
    <PageContainer title="Login Page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: '100vh' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    {/* <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      New to Modernize?
                    </Typography> */}
                    {/* <Typography
                      component={Link}
                      href="/auth/auth2/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography> */}
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}
