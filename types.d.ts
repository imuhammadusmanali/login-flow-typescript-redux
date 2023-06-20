// export type User = {
//   accessToken: string;
//   auth: any; // You can replace 'any' with the appropriate type for the 'auth' property if available
//   displayName: string;
//   email: string;
//   emailVerified: boolean;
//   isAnonymous: boolean;
//   metadata: {
//     createdAt: string;
//     lastLoginAt: string;
//     lastSignInTime: string;
//     creationTime: string;
//   };
//   phoneNumber: string | null;
//   photoURL: string;
//   proactiveRefresh: any; // You can replace 'any' with the appropriate type for the 'proactiveRefresh' property if available
//   providerData: any[]; // You can replace 'any[]' with the appropriate type for the 'providerData' property if available
//   providerId: string;
//   reloadListener: null;
//   reloadUserInfo: {
//     localId: string;
//     email: string;
//     displayName: string;
//     photoUrl: string;
//     emailVerified: boolean;
//     // ... any other properties returned by Firebase
//   };
//   stsTokenManager: {
//     refreshToken: string;
//     accessToken: string;
//     expirationTime: number;
//     // ... any other properties returned by Firebase
//   };
//   tenantId: string | null;
//   uid: string;
//   refreshToken: any; // You can replace 'any' with the appropriate type for the 'refreshToken' property if available
// };

export type User = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string | null;
};

export type InitialState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export type AddUserPayload = {
  user: User;
  navigate: (path: string) => void;
};
