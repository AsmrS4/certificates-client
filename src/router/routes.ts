export const routes = {
    auth: {
        login: '/sign-in',
        oauth: '/oauth/login',
    },
    root: '/',
    certificates: {
        home: '/certificates',
        recovery: '/recovery',
        uploadFile: '/certificate/upload-file',
    },
    errors: {
        forbidden: '/forbidden',
        internal_server: '/server-error',
        not_found: '*',
    },
};
