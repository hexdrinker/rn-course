import { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'

interface GoalInputProps {
  onPress: (text: string) => void
}
const GoalInput = ({ onPress }: GoalInputProps) => {
  const [enteredGoalText, setEnteredGoalText] = useState('')

  const onChangeText = (text: string) => {
    setEnteredGoalText(text)
  }

  const onAddGoal = () => {
    onPress(enteredGoalText)
    setEnteredGoalText('')
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder='Your course goal!!'
        onChangeText={onChangeText}
        value={enteredGoalText}
      />
      <Button
        title='Add Goal'
        onPress={onAddGoal}
      />
    </View>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
})
