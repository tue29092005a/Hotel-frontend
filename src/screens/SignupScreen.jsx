import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";

export default function SignupScreen({ onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert("Thiếu thông tin", "Không được để trống bất kỳ trường nào");
      return;
    }

    try {
      const res = await fetch("http://10.0.2.2:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();
      console.log("Signup response data:", data);
      if (!res.ok) {
        Alert.alert("Lỗi", data.message || "Đăng ký thất bại");
        return;
      }
      console.log("backend response:");
      Alert.alert("Thành công", "Tạo tài khoản thành công!", [
        { text: "OK", onPress: () => onBackToLogin() }
      ]);

    } catch (error) {
      console.log("Signup error:", error);
      Alert.alert("Lỗi mạng", "Không thể kết nối tới server");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <View style={styles.cameraIconShape}>
              <View style={styles.cameraLens} />
            </View>
          </View>
          <Text style={styles.title}>Hotel Manager</Text>
          <Text style={styles.subtitle}>Create a new account</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Nguyễn Văn A"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            style={styles.input}
            testID="inputName"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            testID="inputEmail"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            placeholder="0123456789"
            placeholderTextColor="#9CA3AF"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
            testID="inputPhone"
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { paddingRight: 50 }]}
              autoCapitalize="none"
              testID="inputPassword"
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeText}>{showPassword ? "Ẩn" : "Xem"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            testID="btnSignUp"
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <TouchableOpacity onPress={onBackToLogin}>
          <Text style={styles.footerText}>
            Đã có tài khoản? <Text style={{ color: "#2563EB" }}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    paddingBottom: 40
  },
  header: { alignItems: "center", marginBottom: 32 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },
  cameraIconShape: {
    width: 32,
    height: 24,
    backgroundColor: "#2563EB",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  cameraLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2563EB"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8
  },
  subtitle: { fontSize: 16, color: "#6B7280" },
  form: { marginBottom: 24 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 16
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#2563EB",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center"
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 4
  },
  eyeText: { color: "#6B7280", fontWeight: "600", fontSize: 14 }
});
