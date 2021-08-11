import { TextInput } from "react-native";
import React from "react";
const Input = ({
  placeholder,
  textContentType,
  setValues,
  values,
  type,
  secure,
  style,
  multiline,
  numberOfLines,
}) => {
  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      textContentType={textContentType}
      secureTextEntry={secure}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChangeText={(text) => {
        const obj = { ...values };
        obj[type] = text;
        setValues(obj);
      }}
    />
  );
};

export default Input;
