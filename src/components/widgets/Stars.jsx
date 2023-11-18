import Form from 'react-bootstrap/Form'

const Stars = (props) => {
  const { name, count, cb } = props;
  const content = [];
  for (let i = 0; i < count; ++i)
    content.push(<Form.Check type="radio"
      name={name} key={name+i} value={i+1} onClick={cb} inline />);
  return (
    <span className="stars">
      {content}
    </span>
  );
}

export default Stars;
