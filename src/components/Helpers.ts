export const formatNumber = ( type: string, number: number ): string => {
    if ( 'currency' === type ) {
        return number.toLocaleString('en-US', { 
            style: 'currency', 
            currency: 'USD', 
            minimumFractionDigits: 0,
            maximumFractionDigits: 0, 
        });
    } else if ( 'percent' === type ) {
        return number.toLocaleString('en-US', { 
            style: 'percent', 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    return "Not available";
}
