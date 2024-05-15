import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { LOGIN, USER_INRO } from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserInfo } from "../store/reducer/userReducer";

function Login(props) {
  const { navigation } = props;
  const diapatch = useDispatch();

  const userInfo = useSelector((state) => state.userReducer.userInfo);

  const [username, setUsername] = useState("zx");
  const [password, setPassword] = useState("123456");

  const onLogin = async () => {
    // 表单校验
    if (!username) return console.warn("Please enter a username");
    if (!password) return console.warn("Please enter a password");

    const params = {
      username,
      password,
    };
    const token = await LOGIN(params);
    if (token) {
      await AsyncStorage.setItem("token", token);
      getUserInfo();
    }
  };

  const getUserInfo = async () => {
    const res = await USER_INRO();
    diapatch(setUserInfo(res));
    setTimeout(() => {
      navigation.replace("Tab");
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text>Username</Text>
          <TextInput maxLength={11} placeholder="please input your username" value={username} onChangeText={(val) => setUsername(val)}></TextInput>
        </View>

        <View style={styles.formItem}>
          <Text>Password</Text>
          <TextInput maxLength={11} secureTextEntry placeholder="please input your password" value={password} onChangeText={(val) => setPassword(val)}></TextInput>
        </View>
      </View>

      <Button style={styles.btn} mode="contained" onPress={onLogin}>
        Login
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  formItem: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  btn: {
    marginTop: 20,
  },
});

export default Login;
