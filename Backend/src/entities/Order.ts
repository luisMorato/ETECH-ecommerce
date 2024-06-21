import { completeOrderProps } from "../interfaces/Order.interface";

export class Order {
    private props: completeOrderProps;

    constructor(props: completeOrderProps){
        this.props = props;
    }

    get getProps():completeOrderProps {
        return this.props;
    }
}