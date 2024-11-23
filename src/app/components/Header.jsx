/* eslint-disable react/prop-types */
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="20px">
            <Typography
                variant="h5"
                color={colors.blueAccent[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h7" color={colors.blueAccent[300]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;