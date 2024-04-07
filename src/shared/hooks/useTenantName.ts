export const useTenantName = () => {
    if(window.location.pathname.split('/')[1] == 'organisations')
        return window.location.pathname.split('/')[2]
    return null
}