import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeItem: (title: string) => void
}

 export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    console.log("ES is called")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeItem(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                label="Filled"
                variant="filled"
                value = {title}
                autoFocus
                onBlur = {offEditMode}
                onChange = {changeTitle}
            />
            //     ? <input
            // value = {title}
            // autoFocus
            // onBlur = {offEditMode}
            // onChange = {changeTitle}
            // />
:
    <span onDoubleClick={onEditMode}>{props.title}</span>
)
    ;
});
export default EditableSpan;