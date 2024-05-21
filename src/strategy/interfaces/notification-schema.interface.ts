export interface INotificationSchema {
  user: {
    email: string;
    name?: string;
  };
  context?: any | null;
  subject: string;
  template: string;
}
