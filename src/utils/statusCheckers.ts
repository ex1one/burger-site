import { Status, AuthStatus } from "@src/consts";

export function isInitialByStatus(status: Status) {
  return status === Status.Initial;
}

export function isPendingByStatus(status: Status) {
  return status === Status.Pending;
}

export function isSuccessByStatus(status: Status) {
  return status === Status.Success;
}

export function isErrorByStatus(status: Status) {
  return status === Status.Error;
}

export function isAnonymousByStatus(status: AuthStatus) {
  return status === AuthStatus.Anonymous;
}

export function isAuthenticatedByStatus(status: AuthStatus) {
  return status === AuthStatus.Authenticated;
}
