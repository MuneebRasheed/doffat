import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return value;
  } catch (err) {
    console.log(err);
  }
};

export const removeToken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    console.log(err);
  }
};
