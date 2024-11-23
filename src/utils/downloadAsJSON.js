

export const downloadAsJSON = (data, filename = 'data.json') => {
    const jsonString = JSON.stringify(data, null, 2); // Convierte los datos a formato JSON
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    // Limpia el objeto URL para liberar recursos
    URL.revokeObjectURL(url);
};
