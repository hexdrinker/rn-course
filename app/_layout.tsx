import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Button, FlatList, StyleSheet, View } from 'react-native'
import GoalItem from '@/components/GoalItem'
import GoalInput from '@/components/GoalInput'
import { StatusBar } from 'expo-status-bar'

interface GoalItem {
  text: string
  id: string
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState<Array<GoalItem>>([])
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const addGoalHandler = (text: string) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text, id: Math.random().toString() },
    ])
    endGoalHandler()
  }

  const deleteGoalHandler = (id: string) => {
    setCourseGoals((currentCourseGoals) =>
      currentCourseGoals.filter((item) => item.id !== id)
    )
  }

  const startAddGoalHandler = () => {
    setModalVisible(true)
  }

  const endGoalHandler = () => {
    setModalVisible(false)
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#a065ec'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalVisible}
          onPress={addGoalHandler}
          onCancel={endGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                id={itemData.item.id}
                text={itemData.item.text}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 5,
  },
})
