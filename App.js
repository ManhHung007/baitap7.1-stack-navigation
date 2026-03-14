import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

/* ================= LOGIN SCREEN ================= */

function LoginScreen({ navigation }) {

  const [phone, setPhone] = useState("");
  const [hover, setHover] = useState(false);

  const showMessage = (title, message) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert(title, message);
    }
  };

  const validatePhone = () => {

    const phoneRegex = /^0[0-9]{9}$/;

    if (phone.trim() === "") {
      showMessage("Thông báo", "Vui lòng nhập số điện thoại");
      return;
    }

    if (!phoneRegex.test(phone)) {
      showMessage("Lỗi", "Số điện thoại không đúng định dạng");
      return;
    }

    showMessage("Thành công", "Số điện thoại hợp lệ");

    /* chuyển sang Home */
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.label}>Nhập số điện thoại</Text>

        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Pressable
          style={[
            styles.button,
            { backgroundColor: hover ? "green" : "#ccc" }
          ]}
          onHoverIn={() => setHover(true)}
          onHoverOut={() => setHover(false)}
          onPress={validatePhone}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </Pressable>

      </View>
    </View>
  );
}

/* ================= HOME SCREEN ================= */

function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>
        Chào mừng bạn đến Trang Chủ
      </Text>
    </View>
  );
}

/* ================= APP ================= */

export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Đăng nhập" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

/* ================= STYLE ================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },

  content: {
    padding: 24
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20
  },

  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    marginBottom: 30
  },

  button: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  },

  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  homeText: {
    fontSize: 22,
    fontWeight: "600"
  }

});