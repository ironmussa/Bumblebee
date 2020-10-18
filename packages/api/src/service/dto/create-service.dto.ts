import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class CreateServiceDTO {
  @ApiProperty({ example: "Servicio 1" })
  @IsString()
  name: string;
  @ApiProperty({
    example: {
      "Propiedad 1": "Valor 1",
    },
  })
  @IsMongoId()
  configuration: object;
}