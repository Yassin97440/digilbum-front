
export default defineNuxtRouteMiddleware((to, from) => {


    const authToken = useCookie('authToken');

    if ((authToken?.value === undefined) && !(to.path === '/Login' || to.path === '/Signup')) {
        return navigateTo('/Login')
    }

    // if ((!authToken?.value === undefined)) {
    //     console.log("conditon 2")
    //     return navigateTo(to.path)
    // }



})
