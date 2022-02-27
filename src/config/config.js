const ENV = process.env
export const config = {
  REST_ENDPOINT: `https://${ENV.REACT_APP_API_KEY}.execute-api.${ENV.REACT_APP_REGION}.amazonaws.com/${ENV.REACT_APP_STAGE}/v1`,
  GQL_ENDPOINT: `https://${ENV.REACT_APP_API_KEY}.execute-api.${ENV.REACT_APP_REGION}.amazonaws.com/${ENV.REACT_APP_STAGE}/v1/graphQl`,
  ENVIRONMENT: ENV.NODE_ENV,
  API_KEY: ENV.REACT_APP_API_KEY,
  REGION: ENV.REACT_APP_REGION,
  STAGE: ENV.REACT_APP_STAGE,
  SENTRY_DSN: ENV.REACT_APP_SENTRY_DNS,
  APP_VERSION: ENV.npm_package_version,
}
Object.seal(config)
