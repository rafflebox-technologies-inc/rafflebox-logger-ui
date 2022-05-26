# Rafflebox Logger UI

Logger for the front end applications written in Vue 2. Uses sentry for exception handling/tracking.

## Usage

`npm install @rafflebox-technologies-inc/rafflebox-logger-ui`

You will need to define the following environment variables:

```
import logger from @rafflebox-technologies-inc/rafflebox-logger-ui

const dsn = '<dns from sentry>';

initLogger(router, { dsn, environment: 'production', release: 'git-commit', tracesSampleRate: 100 });

logger.info('Hello World');
```
