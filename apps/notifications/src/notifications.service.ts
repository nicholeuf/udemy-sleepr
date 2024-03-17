import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async notifyEmail({ email, text }: NotifyEmailDto) {
    try {
      const response = await this.trasporter.sendMail({
        from: this.configService.get('SMTP_USER'),
        to: email,
        subject: 'Sleepr Notification',
        text,
      });
      this.logger.log('Email sent', response);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
