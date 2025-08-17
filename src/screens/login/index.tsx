import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { LoginScreenProps } from './types/props.type';
// import { useLoginUI } from './useLogin.hook';
import Images from '../../assets/images/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewLoginUI } from './useLogin';

const LoginScreen: React.FC<LoginScreenProps> = props => {
  // const { email, password, setEmail, setPassword, handleLogin } =
  //   useLoginUI(props);
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    isLoading,
  } = useNewLoginUI(props);

  return (
    <SafeAreaView style={styles.parentView}>
      <KeyboardAvoidingView
        style={styles.parentView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.parentView}>
          <View style={styles.container}>
            <Image
              source={Images.logo}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>Welcome Back!</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {/* <Text style={styles.buttonText}>Login</Text>
              {isLoading && <ActivityIndicator size="large" />} */}
              {isLoading ? (
                <ActivityIndicator color="#fff" size={30} />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => Alert.alert('Forgot Password')}
            >
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => Alert.alert('Navigate to Signup')}
            >
              <Text style={styles.linkText}>
                Don’t have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
