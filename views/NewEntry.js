import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import Input from '../components/Input';
import { useForm, FormProvider } from 'react-hook-form';

import axios from 'axios';

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

  const onSubmit = async (data) => {
    console.log(data);
    let res;
    try {
      res = await fetch('https://4ca7-207-38-131-243.ngrok.io/api/users/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.pageTitle,
          email: data.password
        })
      });
      console.log(res.json());
    } catch (err) {
      console.log(err);
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
          <Button title="Add Entry" onPress={formMethods.handleSubmit(onSubmit)} />
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
});

export default NewEntry;
