import { ResponseModel } from "../responseModel";
import { CustomerDto } from "./customerDto";

export interface CustomerResponseModel extends ResponseModel{
    data:CustomerDto[]
}