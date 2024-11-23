// import { useNavigate } from "react-router-dom";
// import { useAlert } from "../../context/AlertProvider";
// import { caseService } from "../../services/case";


// const useOperatorCaseActions = ({ claimId, employeeId, caseType }) => {
//     const navigate = useNavigate();
//     const { callApi, isLoading } = caseService.usePutOperatorInCase({ claimId, employeeId });
//     const { showAlert } = useAlert();

//     const casePath = caseType === 'Reclamo' ? "/my-claims" : "/my-arbitrations";

//     const assignOperator = async () => {
//         const response = await callApi();
        

//         if(response.hasError){
//             showAlert('Error al asignar operador', 'error');
//             return;
//         }

//         showAlert('Operador asignado correctamente', 'success');
//         navigate(casePath);
//     };


//     return {
//         isLoading,
//         assignOperator,
//     };
//     };

// export default useOperatorCaseActions;
