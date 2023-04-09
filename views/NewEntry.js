import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
import Input from '../components/Input';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@rneui/themed';

import axios from 'axios';
import { BACKEND_URL } from '../Env';

const formArray = [
  {
    id: 'pageTitle',
    placeholder: 'enter your title here',
    type: 'textbox',
    label: 'Page Title',
    defaultValue: '',
    required: true,
  },
  {
    id: 'password',
    placeholder: 'enter the password here',
    type: 'textbox',
    label: 'Password',
    defaultValue: '',
    required: true,
  },
  {
    id: 'notes',
    placeholder: 'security questions, etc.',
    type: 'textarea',
    label: 'Notes',
    defaultValue: '',
    required: false,
  },
];

const NewEntry = ({ navigation }) => {
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm();

  const formMethods = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    let res;
    try {
      res = await fetch(BACKEND_URL + '/api/users/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.pageTitle,
          email: data.password,
          isVerified: false
        })
      });
      alert('Success!');
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert('Please try again later!');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20 }}>Make a new Password Entry!</Text>
      </View>
      <View style={styles.entryForm}>
        <FormProvider {...formMethods}>
          {formArray.map((question, index) => {
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
              />
            );
          })}
          <Button
            buttonStyle={styles.addButtonStyle}
            title="Add Entry"
            onPress={formMethods.handleSubmit(onSubmit)}
            loading={isLoading}
          />
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
  addButtonStyle: {
    padding: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginTop: 35,
  }
});

export default NewEntry;
