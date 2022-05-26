import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { Extras } from '@sentry/types';

export interface LoggerConfig {
  environment: 'production' | 'test' | 'development';
  release: string;
  dsn: string;
  tracesSampleRate: number;
}

let isProd = false;

export const initLogger = (router: any, config: LoggerConfig) => {
  const { dsn, environment, release, tracesSampleRate } = config;

  isProd = config.environment === 'production';

  Sentry.init({
    Vue,
    dsn,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'rafflebox.ca', 'rafflebox-test.ca', /^\//]
      })
    ],
    release,
    environment,
    tracesSampleRate
  });
};

class Logger {
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
