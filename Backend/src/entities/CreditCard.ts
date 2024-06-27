import { dbCreditCard } from "../interfaces/CreditCard.interface";

export class CreditCard {
    private props: dbCreditCard

    constructor(props: dbCreditCard){
        this.props = props;
    }

    get getCreditCardProps(): dbCreditCard {
        return this.props;
    }
}