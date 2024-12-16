export const useAuthFetch = (url, method, body) => {

    const SERVER_HOST = "207.154.214.80:8080"
    return $fetch(
        `http://${SERVER_HOST}/api/v2/${url}`,
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
