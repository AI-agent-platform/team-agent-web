import React, { useState, useEffect } from 'react';
import AuthForm, { PageBackground, StyledInput } from '../components/AuthForm';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '../hooks/useAuth';

const SwitchLink = styled.div`
  margin-top: 18px;
  text-align: center;
  font-size: 1rem;
  color: #2c5364;
  a {
    color: #00c6ff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
    &:hover {
      color: #0072ff;
      text-decoration: underline;
    }
  }
`;

const ErrorMsg = styled.div`
  color: #fff;
  background: #d32f2f;
  border-radius: 6px;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = useSignUp();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    mutate({ email, password });
  };

  return (
    <PageBackground>
      <div>
        <AuthForm
          title="Sign Up"
          onSubmit={handleSubmit}
          buttonText={isPending ? 'Creating...' : 'Create Account'}
        >
          {(localError || isError) && (
            <ErrorMsg>{localError || (error as any)?.response?.data?.message || 'Sign up failed'}</ErrorMsg>
          )}
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </AuthForm>
        <SwitchLink>
          Already have an account? <Link to="/login">Login</Link>
        </SwitchLink>
      </div>
    </PageBackground>
  );
};

export default SignUpPage; 