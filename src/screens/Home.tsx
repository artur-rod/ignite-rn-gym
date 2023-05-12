import { FlatList, HStack, Heading, Text, VStack } from "native-base";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState(["Costas", "Ombros", "Peitos", "Tríceps", "Bíceps", "Pernas", "Abs"])
  const [exercises, setExercises] = useState(["Puxada Frontal", "Remada Curvada", "Remada Unilateral", "Levantamento Terra"])
  const [selectedGroup, setSelectedGroup] = useState("Costas")

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup.toUpperCase() === item.toUpperCase()}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 4 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={4}>
        <HStack justifyContent="space-between" mb={2}>
          <Heading fontFamily="heading" color="gray.200" fontSize="md">Exercícios</Heading>
          <Text color="gray.200" fontSize="sm">4</Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}