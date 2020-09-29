const backendOpts = {
    backendPort : 3000,
    backendHost : 'localhost',
    apiRoute: 'api'
}

export const backendUrl = `http://${backendOpts.backendHost}:${backendOpts.backendPort}/${backendOpts.apiRoute}`