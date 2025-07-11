const Notification = ({
  errorMessage,
  errorStatus
}) =>
{
  return errorMessage === null
    ? null
    : <div data-cy="error" className={errorStatus}>{errorMessage}</div>
}

export default Notification