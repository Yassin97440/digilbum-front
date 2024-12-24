export const useNotify = (useToast, severity, summary, detail, life) => {


  useToast.add({
    severity: 'success',
    summary: summary,
    detail: detail,
    life: life
  })


}
export default useNotify
