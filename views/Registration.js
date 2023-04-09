import { View, Text, StyleSheet, Button } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';

import Input from '../components/Input';
import { useState, useEffect } from 'react';

import { BACKEND_URL } from '../Env';

const loginFormArray = [
  {
    id: 'loginEmail',
    placeholder: 'abc@xyz.com',
    type: 'textbox',
    label: 'Email',
    defaultValue: '',
    required: true,
  },
  {
    id: 'password',
    type: 'textbox',
    label: 'Password',
    defaultValue: '',
    secureTextEntry: true,
    required: true,
  },
];

const signUpFormArray1 = [
  {
    id: 'fullName',
    type: 'textbox',
    label: 'Full Name',
    defaultValue: '',
    required: true,
  },
  {
    id: 'signUpEmail',
    placeholder: 'abc@xyz.com',
    type: 'textbox',
    label: 'Email',
    defaultValue: '',
    required: true,
  },
];

const signUpFormArrayVerificationCode = [
  {
    id: 'verificationCode',
    type: 'textbox',
    label: 'Verification code sent to your email',
    defaultValue: '',
    required: true,
  },
];

const signUpFormArraySetPassword = [
  {
    id: 'newPassword',
    type: 'textbox',
    label: 'Set Your Password',
    defaultValue: '',
    secureTextEntry: true,
  },
  {
    id: 'confirmPassword',
    type: 'textbox',
    label: 'Re-enter your above set password',
    defaultValue: '',
    secureTextEntry: true,
  },
];

const Registration = ({ navigation }) => {
  const formMethods = useForm();
  useEffect(() => {
    formMethods.reset();
    setOnDisplayArray(loginFormArray);
  }, []);

  const [onDisplayArray, setOnDisplayArray] = useState([]);

  const switchToLogin = () => {
    formMethods.reset();
    setOnDisplayArray(loginFormArray);
  };

  const switchToSignUp = async () => {
    formMethods.reset();
    setOnDisplayArray(signUpFormArray1);
  };

  const onLogin = (data) => {
    console.log(data);
    navigation.navigate('New Entry');
    //TO DO
    //Add error check --> api call to login --> navigate to home upon success
  };

  const emailVerificationHandler = async (data) => {
    //Add connection to backend here //sending email to backend for code send to email
    console.log(data);
    let res;
    try {
      res = await fetch(BACKEND_URL + '/api/users/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.signUpEmail,
          isVerified: false,
        }),
      });
      alert('Success!');
      // navigation.goBack();
    } catch (err) {
      console.log(err);
      alert('Please try again later!');
    }
    formMethods.reset();
    setOnDisplayArray(signUpFormArrayVerificationCode);
  };

  const verificationCodeHandler = () => {
    //Add connection to backend here //sending code to backend for validation
    formMethods.reset();
    setOnDisplayArray(signUpFormArraySetPassword);
  };

  const onSignUp = (data) => {
    //backend logic to sign the user up.
    if (!data.newPassword || data.newPassword !== data.confirmPassword) {
      alert('Your passwords do not match!');
    } else {
      alert('Password matched!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {onDisplayArray === loginFormArray && <Text style={{ fontSize: 20 }}>Login</Text>}
        {onDisplayArray !== loginFormArray && (
          <Text style={{ fontSize: 20 }}>Welcome to PasswordCloset!</Text>
        )}
      </View>
      <View style={styles.entryForm}>
        <FormProvider {...formMethods}>
          {onDisplayArray.map((question, index) => {
            return (
              <Input
                key={index}
                defaultValue={question.defaultValue}
                required={question.required}
                control={formMethods.control}
                id={question.id}
                placeholder={question.placeholder}
                type={question.type}
                label={question.label}
                secureTextEntry={question.secureTextEntry}
              />
            );
          })}
          {onDisplayArray === signUpFormArray1 && (
            <View>
              <View style={styles.twoButtons}>
                <Button
                  title="Verify my email"
                  onPress={formMethods.handleSubmit(emailVerificationHandler)}
                />
              </View>
              <View style={styles.twoButtons}>
                <Button title="Switch to login" onPress={switchToLogin} />
              </View>
            </View>
          )}
          {onDisplayArray === loginFormArray && (
            <Button title="Login" onPress={formMethods.handleSubmit(onLogin)} />
          )}
          {onDisplayArray === loginFormArray && (
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpTextStyle}> New to PasswordCloset?</Text>
              <Button title="Sign Up!" onPress={switchToSignUp} />
            </View>
          )}
          {onDisplayArray === signUpFormArrayVerificationCode && (
            <View>
              <Button
                title="Verify Code"
                onPress={formMethods.handleSubmit(verificationCodeHandler)}
              />
              <Button title="Restart" onPress={formMethods.handleSubmit(switchToSignUp)} />
            </View>
          )}
          {onDisplayArray === signUpFormArraySetPassword && (
            <Button title="Finish Sign Up" onPress={formMethods.handleSubmit(onSignUp)} />
          )}
        </FormProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  entryForm: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  title: {
    padding: 15,
    marginTop: 80,
    alignItems: 'center',
  },
  signUpContainer: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpTextStyle: {
    paddingRight: 10,
  },
  twoButtons: {
    padding: 10,
  },
});

export default Registration;
