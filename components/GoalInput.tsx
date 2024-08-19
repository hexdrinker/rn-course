import { useState } from 'react'
import { Button, StyleSheet, TextInput, View, Modal, Image } from 'react-native'

interface GoalInputProps {
  visible: boolean
  onPress: (text: string) => void
  onCancel: () => void
}
const GoalInput = ({ visible, onPress, onCancel }: GoalInputProps) => {
  const [enteredGoalText, setEnteredGoalText] = useState('')

  const onChangeText = (text: string) => {
    setEnteredGoalText(text)
  }

  const onAddGoal = () => {
    onPress(enteredGoalText)
    setEnteredGoalText('')
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
    >
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/goal.png')}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal!!'
          onChangeText={onChangeText}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='Add Goal'
              onPress={onAddGoal}
              color='#b180f0'
            />
          </View>
          <View style={styles.button}>
            <Button
              title='Cancel'
              onPress={onCancel}
              color='#f31282'
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    width: '100%',
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
})
