
export default defineNuxtRouteMiddleware((to, from) => {
    console.log("to", { to })
    console.log("from", from)

    const authToken = useCookie('authToken');

    console.log("🚀 ~ file: auth.js:20 ~ defineNuxtRouteMiddleware ~ authToken:", authToken)
    console.log("🚀 ~ file: auth.js:20 ~ defineNuxtRouteMiddleware ~ authToken.value:", authToken.value)

    if (authToken === undefined || authToken?.value === undefined) {
        console.log("🚀 ~ file: auth.js:12 ~ defineNuxtRouteMiddleware ~  authToken?.value === undefined:", authToken?.value === undefined)
        console.log("🚀 ~ file: auth.js:12 ~ defineNuxtRouteMiddleware ~ authToken === undefined:", authToken === undefined)
        console.log("conditon 1")
        return navigateTo('/Login')
    }

    if ((!authToken?.value === undefined) && (to.path === '/Login' || to.path === '/Signup')) {
        console.log("conditon 2")
        return navigateTo('/')
    }



})
