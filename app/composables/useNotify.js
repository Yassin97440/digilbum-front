export const useNotify = (useToast, severity, summary, detail, life) => {


  useToast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: life,
    group: 'br'
  })


}
export default useNotify
