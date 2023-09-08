import { StyleSheet, View, Text, Platform } from 'react-native';
import { LemonYellow } from '../utils/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: LemonYellow //Coral
    },
    body: {
        padding: Platform.OS === 'ios' ? 15 : 5,
        fontSize: 13,
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic'
    }
});

export default function LittleLemonFooter() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.body}
        numberOfLines={2}>
        {`All rights reserved by Little Lemon, ${new Date().getFullYear()}`}
      </Text>
    </View>
  );
}
