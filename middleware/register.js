
export default defineNuxtRouteMiddleware((to, from) => {


    const authToken = useCookie('authToken');

    if (!authToken?.value === undefined) {
        return navigateTo('/')
    }




})
