import { ResponseModel } from "../responseModel";
import { CarDto } from "./carDto";

export interface CarResponseModel extends ResponseModel{
    data:CarDto[]
}