import { HStack, Heading, Text, VStack } from "native-base";

type Props = {
  group: string;
  name: string;
  time: string;
}
export function HistoryCard({ group, name, time }: Props) {
  return (
    <HStack bg="gray.600" w="full" px={5} py={4} mb={3} rounded="md" alignItems="center" justifyContent="space-between">
      <VStack mr={5} flex={1}>
        <Text color="gray.100" fontSize="sm" textTransform="uppercase" pb={1} numberOfLines={1}>{group}</Text>
        <Heading color="white" fontSize="md" fontFamily="heading" numberOfLines={1}>{name}</Heading>
      </VStack>

      <Text color="gray.300" fontSize="md">{time}</Text>
    </HStack>
  )
}