import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useForm, FormProvider } from 'react-hook-form';

// import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { BACKEND_URL, ENTRY_ENDPOINT, TEST_API_KEY } from '../Env';
import { PasswordEntrySchema } from '../utility/database/PasswordEntrySchema';


// When Backend is Done:
//Edit onSubmit function after editing Env file.

const UpdateEntry = ({ route, navigation }) => {
  const { itemId, pageTitle, password, notes } = route.params;
  const formMethods = useForm();

  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formArray = [
    {
      id: 'pageTitle',
      placeholder: 'enter your title here',
      type: 'textbox',
      label: 'Page Title',
      defaultValue: '',
      required: true,
      editable: editable,
    },
    {
      id: 'password',
      placeholder: 'enter the password here',
      type: 'textbox',
      label: 'Password',
      defaultValue: '',
      required: true,
      editable: editable,
    },
    {
      id: 'notes',
      placeholder: 'security questions, etc.',
      type: 'textarea',
      label: 'Notes',
      defaultValue: '',
      required: false,
      editable: editable,
    },
  ];

  useEffect(() => {
    formMethods.setValue('pageTitle', pageTitle);
    formMethods.setValue('password', password);
    formMethods.setValue('notes', notes);
  }, []);

  const handleUpdateButton = () => {
    setEditable(true);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // let updatedUser = await axios({
      //   method: 'put',
      //   url: BACKEND_URL + ENTRY_ENDPOINT + itemId,
      //   headers: {
      //     'app-id': TEST_API_KEY
      //   },
      //   data: {
      //     firstName: data.pageTitle,
      //     lastName: data.password,
      //     title: data.notes
      //   }
      // });
      // await SecureStore.setItemAsync('pageTitle', data.pageTitle);
      // alert('Sucessfully Updated!');
      setIsLoading(false);
      setEditable(false);
      let res = await SecureStore.getItemAsync('pageTitle');
      console.log(res);
    } catch (err) {
      console.log(err);
      alert('Updated failed! Try again later.');
      setIsLoading(false);
      setEditable(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20 }}>View your password</Text>
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
                editable={question.editable}
              />
            );
          })}
          {!editable && (
            <Button
              title="Update Entry"
              buttonStyle={styles.updateButtonStyle}
              onPress={handleUpdateButton}
            />
          )}
          {editable && (
            <Button
              title="Confirm Update"
              buttonStyle={styles.confirmButtonStyle}
              onPress={formMethods.handleSubmit(onSubmit)}
              loading={isLoading}
            />
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
  confirmButtonStyle: {
    backgroundColor: 'green',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 35,
  },
  updateButtonStyle: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 35,
  },
});

export default UpdateEntry;
