import { DbUserProps } from "../interfaces/User.interface";

export class User {
    private props: DbUserProps;

    constructor( props: DbUserProps ){
        this.props = props;
    }

    get getUserData(): DbUserProps{
        return this.props;
    }
}