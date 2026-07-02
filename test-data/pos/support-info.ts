export const offlineSupportInfo = {
  version: 'Voffline-fast',
  patchVersion: '7',
} as const;

export const liveSupportInfo = {
  version: 'V1.8.0.30.16.8.1',
  patchVersion: undefined,
} as const;

export function supportInfoFor(testMode: 'offline' | 'live') {
  return testMode === 'live' ? liveSupportInfo : offlineSupportInfo;
}
