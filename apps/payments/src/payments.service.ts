import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount, payment_method, currency }: CreateChargeDto) {
    // https://docs.stripe.com/api/payment_intents/create
    // https://docs.stripe.com/testing?testing-method=payment-methods#test-code

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method,
      // Amount intended to be collected by this PaymentIntent.
      // A positive integer representing how much to charge in the smallest
      // currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100,
      // a zero-decimal currency).
      amount: amount * 100,
      confirm: true,
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    return paymentIntent;
  }
}
