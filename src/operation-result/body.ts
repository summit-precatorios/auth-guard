import Error from './error';

export default class Body<T> {
  public success: boolean;
  public data: T;
  public errors?: Array<Error> | null;
}
