const Notification = ({
    errorMessage,
    errorStatus
}) =>
{
    return errorMessage === null
        ? null
        : <div className={errorStatus}>{errorMessage}</div>
}

export default Notification;