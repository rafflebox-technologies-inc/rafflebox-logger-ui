# Rafflebox Logger UI

Logger for the front end applications written in Vue 2. Uses sentry for exception handling/tracking.

## Usage

`npm install @rafflebox-technologies-inc/rafflebox-logger-ui`

You will need to define the following environment variables:

```
import logger from @rafflebox-technologies-inc/rafflebox-logger-ui

const dsn = 'https://7ca86ef794fe4aa3ad9c1f509bcff8d4@o331232.ingest.sentry.io/6417650';

initLogger(router, { dsn, environment: 'production', release: 'git-commit', );

logger.info('Hello World');
```
