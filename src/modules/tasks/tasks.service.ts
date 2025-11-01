import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

/**
 * @description Service that test cron schedules
 */
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.debug('Called when the current second is 5', new Date())
  }
}
