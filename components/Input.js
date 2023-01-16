import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

const Input = (props) => {
  const {
    formState: { errors },
  } = useFormContext();
  const {
    placeholder,
    type,
    label,
    id,
    secureTextEntry,
    defaultValue,
    required,
    control,
    editable,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={{ fontSize: 17 }}>{label}</Text>
      </View>
      <View style={type === 'textbox' ? styles.titleBox : styles.textAreaBox}>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={id}
          rules={{
            required: {
              value: required,
              message: `${label} is required`,
            },
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              placeholder={placeholder}
              style={editable === false ? styles.textInputDisabledStyle : styles.textInputStyle}
              multiline={type === 'textarea' ? true : false}
              value={value}
              onChangeText={(value) => onChange(value)}
              secureTextEntry={secureTextEntry === true ? true : false}
              editable={editable}
              selectTextOnFocus={false}
            />
          )}
        />
      </View>
      {errors && <Text style={styles.errorTextStyle}>{errors[id]?.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    padding: 10,
  },
  titleBox: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '100%',
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    height: 50,
    backgroundColor: 'white',
  },
  textAreaBox: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#cccccc',
    height: 160,
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textInputStyle: {
    flex: 1,
    fontSize: 15,
  },
  textInputDisabledStyle: {
    flex: 1,
    fontSize: 15,
    color: 'grey',
  },
  errorTextStyle: {
    color: 'red',
  },
});

export default Input;
