import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LIST_CATEGORIES } from '../../../common/types';
import { blue, blueGrey, orange } from '@mui/material/colors';

const GraphDashboard = ({ claimsByCategory, arbitrationsByCategory }) => {


    if (!claimsByCategory || !arbitrationsByCategory) {
        return null;
    }

    const uData = LIST_CATEGORIES.map(category => {
        const claim = claimsByCategory.find(claim => claim._id === category);
        const arbitration = arbitrationsByCategory.find(arbitration => arbitration._id === category);

        return {
            x: category,
            uv: claim ? claim.count : 0,  // Reclamos
            pv: arbitration ? arbitration.count : 0,  // Mediaciones
        };
    });

    return (
        <div className='mt1'>
            <BarChart
                height={300}
                series={[
                    {
                        data: uData.map(data => data.uv), // Reclamos
                        label: 'Reclamos',
                        id: 'uvId',
                    },
                    {
                        data: uData.map(data => data.pv), // Mediaciones
                        label: 'Mediaciones',
                        id: 'pvId',
                    },
                ]}
                xAxis={[{ data: LIST_CATEGORIES, scaleType: 'band' }]}
                yAxis={[{ label: "Casos activos" }]}

            />
        </div>
    );
};

export default GraphDashboard;
