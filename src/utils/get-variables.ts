export const getVariables=(RESULTS_PER_PAGE:number,page:number)=>{
    return {
        first:RESULTS_PER_PAGE,
        offset: page* RESULTS_PER_PAGE
    }
}