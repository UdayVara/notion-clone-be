import { IsNotEmpty, IsString } from "class-validator";


export class createDocumentDto{

    @IsString()
    @IsNotEmpty()
    title:string;

    

    @IsString()
    @IsNotEmpty()
    content:string;



}