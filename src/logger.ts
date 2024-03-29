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
  info = (message: string, extra: Extras) => {
    if (!isProd) {
      console.log(message);
    }
    Sentry.captureMessage(message, {
      level: Sentry.Severity.Info,
      extra
    });
  };

  error = (error: any, extra: Extras) => {
    if (!isProd) {
      console.error(error, extra);
    }
    Sentry.captureException(error, {
      extra
    });
  };

  debug = (message: any, data: unknown) => {
    if (!isProd) {
      console.log(message, data);
    }
  };

  trace = (message: string, data: { [key: string]: any }, level?: Sentry.Severity) => {
    Sentry.addBreadcrumb({ message, data, level });
  };
}

const logger = new Logger();

export default logger;
