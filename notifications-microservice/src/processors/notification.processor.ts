import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import axios from 'axios';

@Processor('users-queue')
export class NotificationProcessor extends WorkerHost {
  async process(job: Job) {
    const { userId } = job.data;

    try {
      await axios.post('https://webhook.site/f2ea4495-3406-4dbc-8c84-fd8f4c345f18', {
        message: `Push notification for user ${userId}`,
      });
      console.log(`Notification sent for user ${userId}`);
    } catch (error) {
      console.error(`Failed to send notification for user ${userId}`, error);
    }
  }
}
