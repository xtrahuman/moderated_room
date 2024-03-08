export const TOGGLEMESSAGEFEATURE = "user/message/feature";

 const handleMessageInterface = (data) => {
    return {
    type: TOGGLEMESSAGEFEATURE,
    payload: data,
}}

export default handleMessageInterface;