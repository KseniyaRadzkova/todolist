import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextareaAutosize, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error,setError] =useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onKeyPressAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle( "")
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
            variant={"outlined"}
            value={title}
            onChange={changeTitle}
            onKeyPress={onKeyPressAddTask}
            helperText={error ? "Title is required" : ""}
            label={"Title"}
            error={error}
            />

            <IconButton onClick={addItem}>
                <AddBox />
            </IconButton>
                {/*<button onClick={addItem}>+</button>*/}
            {/*{error&&<div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}
export default AddItemForm;