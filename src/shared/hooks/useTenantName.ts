export const useTenantName = () => {
    return window.location.pathname.split('/')[2]
}