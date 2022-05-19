import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { Extras } from '@sentry/types';
import { VueRouterInstrumentation } from '@sentry/vue/types/router';

const isProd = process.env.ENV === 'production';
const environment = process.env.SENTRY_ENVIRONMENT;
const release = process.env.GIT_COMMIT || 'master';

export const initLogger = (router: any) => {
  Sentry.init({
    Vue,
    dsn: 'https://7ca86ef794fe4aa3ad9c1f509bcff8d4@o331232.ingest.sentry.io/6417650',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'rafflebox.ca', 'rafflebox-test.ca', /^\//]
      })
    ],
    release,
    environment,
    tracesSampleRate: isProd ? 10 : 100
  });
};

export class Logger {
  info = (message: string) => {
    if (!isProd) {
      console.log(message);
    }
    Sentry.captureMessage(message, {
      level: Sentry.Severity.Info
    });
  };

  error = (error: Error, extra: Extras) => {
    if (!isProd) {
      console.error(error, extra);
    }
    Sentry.captureException(error, {
      extra
    });
  };

  debug = (message: string, data: unknown) => {
    if (!isProd) {
      console.log(message, data);
    }
  };
}

const logger = new Logger();

export default logger;
