export const homeFunctions = {
  admin: 'Admin',
  dineIn: 'Dine In',
  drawer: 'Drawer',
  session: 'Session',
  toGo: 'To Go',
} as const;

export type HomeFunctionName = (typeof homeFunctions)[keyof typeof homeFunctions];

export const sessionMoveError = "Can't move this button to/from hide area";
