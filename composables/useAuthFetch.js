export const useAuthFetch = (url, method, body) => {

    const SERVER_HOST = "localhost:8080"
    return $fetch(
        `http://${SERVER_HOST}/api/v2/${url}`,
        {
            headers: {

                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            method: method,
            body: body

        }
    )

}
export default useAuthFetch
