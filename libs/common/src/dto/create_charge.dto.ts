import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  // TODO: Remove hard-coded payment_method default used for testing
  @IsString()
  @IsNotEmpty()
  payment_method?: string = 'pm_card_visa';

  @IsString()
  @IsNotEmpty()
  currency?: string = 'usd';
}
