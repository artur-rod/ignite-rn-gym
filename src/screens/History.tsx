import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

import { MaterialIcons } from "@expo/vector-icons";
import { Heading, Icon, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "08.04.23",
      data: [
        { group: "costas", name: "Puxada Frontal", time: "08:56" },
        { group: "costas", name: "Remada Unilateral", time: "08:56" }
      ]
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <HistoryCard group={item.group} name={item.name} time={item.time} />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>{section.title}</Heading>
        )}
        contentContainerStyle={!exercises.length && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <VStack alignItems="center">
            <Icon as={MaterialIcons} name="sentiment-dissatisfied" size={10} mb={4} />
            <Text color="gray.200" textAlign="center">
              Não há exercícios registrados ainda.{"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          </VStack>
        )}
        px={6}
      />
    </VStack>
  )
}