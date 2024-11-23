import { useEffect, useState } from "react";
import { logsService } from "../../services/logs"
import { useInView } from "react-intersection-observer";
import { useAlert } from "../../context/AlertProvider";


export const useGetLogsActions = ({ showScrollButton }) => {
    const { showAlert } = useAlert();
    const { callApi, isLoading } = logsService.useGetLogs();
    const { ref, inView } = useInView();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const [search, setSearch] = useState('');
    const [logs, setLogs] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const handleGetLogs = async () => {
        const response = await callApi({}, `?search=${search}&page=${page}&limit=${pageSize}`);

        if(response.hasError){
            showAlert('Error al cargar los logs', 'error');
            return;
        }

        if (response.response.logs.length === 0) {

            setHasMore(false);

            if (showScrollButton) {
                showAlert('No se encontraron más resultados', 'info');
            }

            return;
        }

        setLogs((prevLogs) => [...prevLogs, ...response.response.logs]);
    };


    const handleSearch = () => {
        setLogs([]);
        setHasMore(true);
        setPage(1);
        handleGetLogs();
    }

    useEffect(() => {
        if (inView && hasMore) {
            handleGetLogs();
            setPage(page + 1);
        }
        
    }, [inView]);


    return {
        isLoading,
        logs,
        search, handleSearch,
        setSearch,
        ref, inView,
    }   
}