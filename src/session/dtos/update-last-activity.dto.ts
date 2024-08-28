import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateLastActivityDto {
  @IsDate()
  @IsNotEmpty()
  lastActivityAt: Date;
}
