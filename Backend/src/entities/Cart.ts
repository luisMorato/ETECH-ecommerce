import { cartProps } from "../interfaces/Cart.interface";

export class Cart {
    private props: cartProps;

    constructor(props: cartProps){
        this.props = props;
    }

    get getProps():cartProps {
        return this.props;
    }
}