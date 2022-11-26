import { ApplicationError } from "@/protocols";

export function paymentRequiredError(): ApplicationError {
  return {
    name: "Payment Required",
    message: "You not have ticket paid",
  };
}
