/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import useGetNotificationsActions from '../../../hooks/notifications/useGetNotificationsActions'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { ColorModeContext, tokens } from '../../../styles/theme';
import './TopBar.scss'
import { useAuth } from '../../../context/AuthProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import { EXTERNAL_ROLES } from '../../../common/rolesPermissions';

const CustomIconButton = ({ children, onClick, extraStyles }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: colors.blueAccent[200],
                borderRadius: '0',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover
                },
                ...extraStyles
            }}
        >
            {children}
        </IconButton>
    );
};


const TopBar = ({ toggleSidebar }) => {
    const { auth, logoutUser, USER_PERMISSIONS } = useAuth();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isExternalUser = Object.values(EXTERNAL_ROLES).includes(auth.accessRole);

    const mockNotifications = [
        'You have a new message.',
        'Your order has been shipped.',
        'Don\'t forget to check your schedule.',
    ];

    const [notifications, setNotifications] = useState(mockNotifications)


    //TODO: Descomentar esto cuando funcionan las notis desde el back.
    // const { isLoadingNotifications } = useGetNotificationsActions({
    //     setNotifications
    // })

    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = useState(false);

    const isAllowedProfile = USER_PERMISSIONS?.GET_USER_PROFILE;
    // const isAllowedNotifications = USER_PERMISSIONS?.GET_NOTIFICATIONS;
    const isAllowedNotifications = false;



    return (
        <Box display='flex' justifyContent='space-between' p={2}
            backgroundColor={colors.grey[400]}
            boxShadow={'0px 0px 5px 0px rgba(0,0,0,0.2)'}
        >
            {!isExternalUser ?
                <CustomIconButton onClick={toggleSidebar}>
                    <MenuOutlinedIcon />
                </CustomIconButton>
                :
                <Box></Box>
            }

            <Box display='flex'>


                {isAllowedNotifications &&
                    <div
                        className="nav-item notifications"
                        onMouseEnter={() => setShowNotifications(true)}
                        onMouseLeave={() => setShowNotifications(false)}
                    >
                        <CustomIconButton >
                            <NotificationsNoneOutlinedIcon />
                        </CustomIconButton>
                        {showNotifications && (
                            <div className="notification-list">
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <p key={index}>{notification}</p>
                                    ))
                                ) : (
                                    <p>No new notifications</p>
                                )}
                            </div>
                        )}
                    </div>
                }


                <CustomIconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </CustomIconButton>

                {isAllowedProfile ?
                    <CustomIconButton
                        extraStyles={{ display: "flex", alignItems: "center", gap: "8px" }}
                        onClick={() => navigate('/profile')}
                    >
                        <AccountCircleOutlinedIcon />
                        {isMobile
                            ? null
                            : <Typography>{auth.fullName}</Typography>}

                    </CustomIconButton>
                    :
                    <CustomIconButton onClick={() => logoutUser()}>
                        <LogoutIcon color='error' />
                    </CustomIconButton>
                }
            </Box>
        </Box>
    )
}



export default TopBar;