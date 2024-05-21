import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { useSelector } from '@/store/hooks'
import { IconPower } from '@tabler/icons-react'
import { AppState, dispatch } from '@/store/store'
import Link from 'next/link'
import { userActions } from '@/store/business/user/slice'

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer)
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : ''
  const userProfile = useSelector(state => state.user.profile)

  const handleLogout = () => {
    dispatch(userActions.logoutSuccess())
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={'/images/profile/user-1.jpg'}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">{userProfile?.user_name}</Typography>
            <Typography variant="caption">Admin</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                href="/login"
                aria-label="logout"
                size="small"
                onClick={handleLogout}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
