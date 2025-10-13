import { INotificationSchema } from './notification-schema.interface'

export interface INotificationStrategy {
  sendNotification(schema: INotificationSchema): void
}
