import { Entypo } from "@expo/vector-icons";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {}
export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded={4} mb={3}>
        <Image
          source={{ uri: "https://www.origym.com.br/upload/remada-unilateral-3.png" }}
          alt="Exercise Image"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" fontFamily="heading" color="white">Remada Unilateral</Heading>
          <Text fontSize="sm" color="white" mt={1} numberOfLines={1}>3 séries | 12 repetições</Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" size={5} />
      </HStack>
    </TouchableOpacity>
  )
}