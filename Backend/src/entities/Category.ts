import { categoriesAndSubCategories } from "../interfaces/Category.interface";


export class Category {
    private props: categoriesAndSubCategories;

    constructor(props: categoriesAndSubCategories) {
        this.props = props;
    }

    get getCategory(): categoriesAndSubCategories {
        return this.props;
    }
}