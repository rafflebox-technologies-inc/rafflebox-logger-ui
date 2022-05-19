# Rafflebox Logger UI

Logger for the front end applications written in Vue 2. Uses sentry for exception handling/tracking.

## Usage

Add `@rafflebox-technologies-inc:registry=https://npm.pkg.github.com/` to your `.npmrc` file.

You will need to define the following environment variables:

```
ENV=production
SENTRY_ENVIRONMENT=production
GIT_COMMIT=<git commit of the current branch>
```

If `ENV` is equal to `production` or `test` then Sentry will be enabled. Otherwise logs will just go to stdout.

```
import logger from @rafflebox-technologies-inc/rafflebox-logger-ui

const dsn = '@rafflebox-technologies-inc/rafflebox-logger-ui';
initLogger(router, dsn);

logger.info('Hello World');

```

## Publish

Publishes the package to github. Note: the pipeline does this.

`yarn publish`
