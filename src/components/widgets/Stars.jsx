import Form from 'react-bootstrap/Form'

const Stars = () => {
  return (
    <div className="stars">
      <Form>
        <div>
        <Form.Check
          inline
          checked
          type="radio"
          name="name"
          />
        <Form.Check
          inline
          type="radio"
          name="name"
          />
        </div>
      </Form>
    </div>
  );
}

export default Stars;
