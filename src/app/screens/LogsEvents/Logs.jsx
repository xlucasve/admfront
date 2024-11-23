import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Box,
    Fab,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GridArrowUpwardIcon } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../styles/theme';
import { useGetLogsActions } from '../../../hooks/logs_/useGetLogsActions';
import Header from '../../components/Header';

export const Logs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [showScrollButton, setShowScrollButton] = useState(false);

    const { logs, isLoading, search, setSearch, ref, handleSearch } = useGetLogsActions(showScrollButton);

    //TODO: Fix search.

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ width: '100%', padding: 4 }}>

            <Box display={'flex'} justifyContent={'space-between'}>

                <Header title={'Logs'} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <TextField
                        label="Buscar en logs"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ marginRight: 1 }}
                    />
                    <IconButton onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{
                backgroundColor: colors.grey[300],
                borderRadius: 1,
                boxShadow: 1,
                marginBottom: 2,
            }}>
                <Table sx={{ minWidth: 650 }} aria-label="log table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: colors.blueAccent[800] }}
                        >
                            <TableCell style={{ fontWeight: 'bold' }}>Fecha emisión</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Módulo emisor</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Responsable</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Evento</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {logs.map((log) => (
                            <TableRow key={log._id}>
                                <TableCell>{new Date(log.timestamp).toUTCString()}</TableCell>
                                <TableCell>{log?.moduleEmitter}</TableCell>
                                <TableCell>{log?.performedBy}</TableCell>
                                <TableCell>{log?.eventType}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow ref={ref} sx={{ alignItems: 'center', justifyContent: 'center' }} >
                            {isLoading && <TableCell colSpan={5} align="center">
                                {<CircularProgress size={24} />}
                            </TableCell>}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {showScrollButton && (
                <Fab
                    color="primary"
                    size="small"
                    onClick={scrollToTop}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <GridArrowUpwardIcon />
                </Fab>
            )}

        </Box>
    );
}