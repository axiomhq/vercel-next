/**
 * @jest-environment jsdom
 */
jest.mock('cross-fetch');
import { log } from '../src/logger';
import { getIngestURL, EndpointType } from '../src/config';
import fetch from 'cross-fetch';

jest.useFakeTimers();
const url = getIngestURL(EndpointType.log);

test('logging', async () => {
  log.info('hello, world!');
  log.debug('testing if this will work', { foo: 'bar', answer: 42 });
  expect(fetch).toBeCalledTimes(0);

  jest.advanceTimersByTime(1000);
  expect(fetch).toBeCalledTimes(1);

  expect(fetch).toHaveBeenCalledWith(url, {
    body: JSON.stringify([
      { level: 'info', message: 'hello, world!', _time: '' },
      { level: 'debug', message: 'testing if this will work', foo: 'bar', answer: 42, _time: '' },
    ]),
    method: 'POST',
    keepalive: true,
  });
});
