import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { tokens } from "../../../styles/theme";

export const GridContainer = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            m="0 0 0 0"
            height="75vh"
            sx={{
                // El contenedor ahora tendrá un ancho flexible
                width: "100%", // Aseguramos que ocupe todo el espacio disponible
                overflowX: "auto", // Permitir el desplazamiento horizontal si es necesario
                "& .MuiDataGrid-root": {
                    border: "none",
                    // Es importante darle un ancho mínimo al DataGrid si es necesario
                    minWidth: "1000px", // Aseguramos que el DataGrid tenga suficiente ancho
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.blueAccent[400],
                },
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: `${colors.blueAccent[900]} !important`,
                    borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                    fontSize: ".7rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.grey[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: `${colors.blueAccent[900]} !important`,
                },
                "& .MuiTablePagination-root": {},
                "& .MuiSvgIcon-root-": {},
            }}
        >
            {children}
        </Box>
    );
};
