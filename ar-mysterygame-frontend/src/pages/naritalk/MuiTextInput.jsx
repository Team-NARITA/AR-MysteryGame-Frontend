import { Box, Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";

import SendIcon from '@mui/icons-material/Send';

const MuiTextInput = ({chatController, actionRequest}) => {
    const chatCtl = chatController;
    const [value, setValue] = useState(actionRequest.defaultValue);
    const setResponse = useCallback(() => {
        if (value) {
            const res = {
                type: "text",
                value
            };
            chatCtl.setActionResponse(actionRequest, res);
            setValue("");
        }
    }, [actionRequest, chatCtl, value]);

    const handleKeyDown = useCallback(e => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setResponse();
        }
    }, [setResponse]);
    const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : 'Send';
    return (
        <Box sx={{
            flex: '1 1 auto',
            display: 'flex',
            '& > *': {
                flex: '1 1 auto',
                minWidth: 0
            },
            '& > * + *': {
                ml: 1
            },
            '& :last-child': {
                flex: '0 1 auto'
            }
        }}>
            <TextField
                placeholder={actionRequest.placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus={true}
                multiline={true}
                inputProps={{
                    onKeyDown: handleKeyDown
                }}
                variant="outlined"
                maxRows={10}
            />
            <Button
                type="button"
                onClick={() => setResponse()}
                disabled={!value}
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
            >{sendButtonText}</Button>
        </Box>
    )
}

export default MuiTextInput;