import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './stypes'

const ErrorComponent = ({ errorMsg }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{errorMsg}</Text>
    </View>
  )
}

export default ErrorComponent