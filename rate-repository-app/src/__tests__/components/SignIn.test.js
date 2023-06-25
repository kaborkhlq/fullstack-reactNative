/* eslint-disable jest/expect-expect */

import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import {SignInContainer} from '../../components/SignIn'; 
import * as yup from 'yup';


describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

    const validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });
      render (<SignInContainer onSubmit={onSubmit} validationSchema={validationSchema}/>);
  
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByText('Sign in'));
  
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });
});