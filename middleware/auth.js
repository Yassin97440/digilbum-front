
import * as jose from 'jose'
export default defineNuxtRouteMiddleware((to, from) => {


    const authToken = useCookie('authToken');
    // console.log("🚀 ~ defineNuxtRouteMiddleware ~ authToken:", authToken._rawValue)
    // console.log("joseeee : ", jose.jwtDecrypt(authToken._rawValue));
    jose.compactDecrypt(authToken._rawValue, { complete: true })
    // console.log("🚀 ~ defineNuxtRouteMiddleware ~ payload:",
    //     jose.compactDecrypt(authToken._rawValue, { complete: true })
    // )

    if ((authToken?.value === undefined) && !(to.path === '/Login' || to.path === '/Signup')) {
        return navigateTo('/Login')
    }


})
