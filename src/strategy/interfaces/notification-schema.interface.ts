export interface INotificationSchema {
  user: {
    email: string;
  };
  context: any;
  subject: string;
  template: string;
}
