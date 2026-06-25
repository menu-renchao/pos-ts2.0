export type TestEnvironment = {
  posHomeUrl: string;
  posEmenuUrl: string;
  clientMode: 'stub' | 'live';
  testMode: 'offline' | 'live';
};

export const testEnvironment: TestEnvironment = {
  posHomeUrl: process.env.POS_HOME_URL ?? 'http://192.168.0.72:22080/kpos/front2/myhome.html',
  posEmenuUrl: process.env.POS_EMENU_URL ?? 'http://192.168.0.72:22080/emenu/index.html',
  clientMode: (process.env.CLIENT_MODE as 'stub' | 'live' | undefined) ?? 'stub',
  testMode: (process.env.POS_TEST_MODE as 'offline' | 'live' | undefined) ?? 'offline',
};
