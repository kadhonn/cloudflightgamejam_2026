import { EntityBaseState } from "./EntityStateBase";

export enum CouchTableMessState {
    NONE,
    LITTLE,
    MEDIUM,
    LOTS
}

export class CouchTableState extends EntityBaseState {
    public messState: CouchTableMessState;

    public constructor(messState = CouchTableMessState.NONE)
    {
        super()
        this.messState = messState;
    }
}