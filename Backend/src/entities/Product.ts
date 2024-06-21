import {
    productProps
} from "../interfaces/Product.interface";

export class Product {
    private props: productProps;

    constructor(props: productProps) {
        this.props = props;
    }

    get productData(): productProps {
        return this.props;
    }
}
