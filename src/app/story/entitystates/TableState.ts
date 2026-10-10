import { EntityBaseState } from "./EntityStateBase";

export class TableState extends EntityBaseState {
    public hasNote: boolean;
    public noteText: string;

    public constructor(hasNote = false, noteText = "")
    {
        super()
        this.hasNote = hasNote;
        this.noteText = noteText;
    }
}