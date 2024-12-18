export const useAuthFetch = (url, method, body) => {
    const config = useRuntimeConfig();
    const SERVER_HOST = config.public.apiBaseUrl;
    return $fetch(
        `${SERVER_HOST}/api/v2/${url}`,
        {
            headers: {

                // "Content-Type": "application/json",
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Authorization': "Bearer " + useCookie('authToken').value
            },
            method: method,
            body: body

        }
    )

}
export default useAuthFetch
