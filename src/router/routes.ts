export const routes = {
    auth: {
        login: 'sign-in',
        oauth: 'oauth/login',
    },
    root: '/',
    certificates: {
        home: 'certificates',
        foreign: 'foreign',
        history: 'history',
        recovery: 'recovery',
        uploadFile: 'certificate/upload-file',
        details: 'certificates/:id',
    },
    errors: {
        forbidden: 'forbidden',
        internal_server: 'server-error',
        not_found: '*',
    },
};
