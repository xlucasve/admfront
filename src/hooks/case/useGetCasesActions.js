/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useReducer, useState } from "react";
import { caseService } from "../../services/case";
import { MAP_CASE_TYPE } from "../../common/types";
import { useAlert } from "../../context/AlertProvider";


export const useGetCasesActions = ( {caseType, username = ""} ) => {
    const { showAlert } = useAlert();
    const [totalClaims, setTotalClaims] = useState(1);
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 25,
    });

    const [cases, setCases] = useState([]);

    const caseType_ES = MAP_CASE_TYPE[caseType];

    const { callApi, isLoading } = username 
            ? caseService.useGetMyCases( { username } )
            : caseService.useGetAllCases();

    const handleGetCases = async () => {
        const response = await callApi({}, `?caseType=${caseType_ES}&page=${paginationModel.page}&limit=${paginationModel.pageSize}`);
        
        if(response.hasError){
            showAlert('Error al cargar los casos', 'error');
            return;
        }

        setTotalClaims(response.response.totalClaims);
        setCases(response.response.foundClaimsPaginated);
    };

    useEffect(() => {
        handleGetCases();
    }, [paginationModel.page, paginationModel.pageSize]);



    return {
        isLoading,
        totalClaims,
        cases,
        paginationModel,
        setPaginationModel,
        setCases
    }
}