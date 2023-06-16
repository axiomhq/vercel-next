import { useReportWebVitals as useNextReportWebVitals } from 'next/web-vitals';
import { usePathname } from 'next/navigation';
import { Logger, LoggerConfig } from 'next-axiom-core';
import { reportWebVitals } from './webVitals';
import { useEffect } from 'react';

export function useReportWebVitals() {
  const path = usePathname();
  useNextReportWebVitals((metric) => reportWebVitals(metric, path));
}

export function useLogger(config: LoggerConfig = {}): Logger {
  const path = usePathname();
  useEffect(() => {
    return () => {
      if (logger) {
        logger.flush();
      }
    };
  }, [path]);

  const logger = new Logger(config);
  return logger; // FIXME: Provide request data and source
}