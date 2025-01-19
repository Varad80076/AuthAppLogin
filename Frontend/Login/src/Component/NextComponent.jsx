import { useLocation } from 'react-router-dom';

const NextComponent = () => {
  const location = useLocation();
  const { email, name } = location.state || {};

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>Your email is: {email}</p>
    </div>
  );
};

export default NextComponent;
