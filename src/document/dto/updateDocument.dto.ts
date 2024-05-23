import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class updateDocument{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isArchived:boolean;


    @ApiProperty()
    parentDocument?:string;

    @ApiProperty()
    coverImage?:string;

    @ApiProperty()
    icons?:string;

    @ApiProperty()
    isPublished?:boolean;
}