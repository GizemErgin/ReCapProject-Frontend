import { ResponseModel } from "../responseModel";
import { RentalDto } from "./rentalDto";

export interface RentalResponseModel extends ResponseModel{
    data:RentalDto[]
}