import { IsCreditCard, IsNumber, IsString } from 'class-validator';

export class CardDto {
  /**
   * The card's CVC. It is highly recommended to always include this value.
   */
  @IsString()
  cvc: string;

  /**
   * Two-digit number representing the card's expiration month.
   */
  @IsNumber()
  exp_month: number;

  /**
   * Four-digit number representing the card's expiration year.
   */
  @IsNumber()
  exp_year: number;

  /**
   * Contains information about card networks used to process the payment.
   */
  // networks?: Card1.Networks;

  /**
   * The card number, as a string without any separators.
   */
  @IsCreditCard()
  number: string;
}
