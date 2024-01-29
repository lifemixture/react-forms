import './ErrorMsgs.scss';

type ErrorMsgsProps = {
  errors: string[];
}

const ErrorMsgs = (props: ErrorMsgsProps) => {
  const { errors } = props;

  return (
    <div className="error-msgs">
      {
        errors.map((message, index) => (
          <div
            className="error-msg"
            key={index}
          >
            {message}
          </div>
        ))
      }
    </div>
  );
};

ErrorMsgs.defaultProps = {
  errors: [],
};

export default ErrorMsgs;
