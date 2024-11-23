/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { useTheme } from '@mui/material';
import Logo from '../../../assets/smarthome-logo.svg'
import { tokens } from '../../../styles/theme';
import { useGlobal } from '../../../context/global/globalContext';
import { SIDEBAR_SIZE } from '../../../common/types';
import { EXTERNAL_ROLES, PATH_VIEWS, VIEWS_PATH } from '../../../common/rolesPermissions';



const SideBar = ({ USER_PERMISSIONS, accessRole }) => {
    const { globalState, toggleSidebar } = useGlobal();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selected, setSelected] = useState(location.pathname);
    const mainItemColor = colors.blueAccent[100];
    const navigate = useNavigate();

    if (isMobile && globalState.sidebarOpen) {
        return null;
    }

    const isExternalUser = Object.values(EXTERNAL_ROLES).includes(accessRole)
    let menuItems = [];

    // A los roles internos se les muestra las opciones.
    if (!isExternalUser) {
        menuItems = [
            { title: "Dashboard", to: VIEWS_PATH.GET_DASHBOARD, icon: <HomeOutlinedIcon /> },
            { title: "Reclamos", to: USER_PERMISSIONS && USER_PERMISSIONS["GET_MY_CLAIMS"] ? VIEWS_PATH.GET_MY_CLAIMS : VIEWS_PATH.GET_ALL_CLAIMS, icon: <BugReportOutlinedIcon /> },
            // { title: "Mediaciones", to: USER_PERMISSIONS && USER_PERMISSIONS["GET_MY_ARBITRATIONS"] ? VIEWS_PATH.GET_MY_ARBITRATIONS : VIEWS_PATH.GET_ALL_ARBITRATIONS, icon: <ErrorIcon /> },
            { title: "Registros", to: VIEWS_PATH.GET_LOGS, icon: <ReceiptOutlinedIcon /> },
            { title: "Control de acceso", to: VIEWS_PATH.GET_ALL_USERS, icon: <SecurityOutlinedIcon /> },
        ];
    }



    return (

        <Sidebar
            collapsed={globalState.sidebarOpen}
            style={{ backgroundColor: colors.grey[400] }}
            width={SIDEBAR_SIZE.OPEN + "px"}
            rootStyles={{
                height: '100vh',
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                border: 'none',
            }}
            backgroundColor={colors.grey[400]}

        >
            <Menu iconShape="square">

                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={toggleSidebar}
                    disabled={isExternalUser}
                    icon={globalState.sidebarOpen ? <img src={Logo} alt="SmartMove" height={'47px'} width={'70px'} /> : undefined}
                    style={{
                        margin: "10px 0 20px 0",
                        color: mainItemColor,
                        backgroundColor: 'transparent',
                    }}

                >
                    {!globalState.sidebarOpen && (
                        <img src={Logo} alt="SmartMove" height={'47px'} width={'70px'}
                            style={{
                                margin: "10px 0 0 0",
                                color: mainItemColor,
                                backgroundColor: 'transparent',
                            }} />
                    )}
                </MenuItem>


                <Box paddingLeft={globalState.sidebarOpen ? undefined : "1%"}>
                    {menuItems.map(({ title, to, icon }) => (
                        USER_PERMISSIONS[PATH_VIEWS[to]] && (
                            <MenuItem
                                key={to}
                                active={selected === to}
                                style={{
                                    color: mainItemColor,
                                    backgroundColor: selected === to ? 'rgba(0, 0, 0, 0.1)' : colors.grey[400],
                                }}
                                onClick={() => {
                                    setSelected(to);
                                    navigate(to);
                                }}
                                icon={icon}
                            >
                                <Typography marginRight={0.3}>
                                    {title}
                                </Typography>
                            </MenuItem>
                        )
                    ))}
                </Box>
            </Menu>
        </Sidebar>

    );
};

export default SideBar;
