import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class createDocumentDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string;

    

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content:string;



}