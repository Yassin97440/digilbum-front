import * as jose from 'jose'
export default defineNuxtRouteMiddleware(async (to, from) => {

    const authToken = useCookie('authToken');

    if (authToken.value) {
        try {
            const my_secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"

            // Décodage de la clé en Base64 pour correspondre au décodage Java
            const secretBytes = new Uint8Array(
                atob(my_secret)
                    .split('')
                    .map(char => char.charCodeAt(0))
            );


            const { payload } = await jose.jwtVerify(authToken.value, secretBytes, {
                algorithms: ['HS256']
            })
        } catch (error) {
            console.error("Erreur de décodage du token:", error)
            authToken.value = null
            return navigateTo('/Login')
        }
    }

    if ((authToken?.value === undefined) && !(to.path === '/Login' || to.path === '/Signup')) {
        return navigateTo('/Login')
    }

})
