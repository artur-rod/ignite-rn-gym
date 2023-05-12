import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

import { Button } from "@components/Button";

import BodySVG from "@assets/body.svg";
import RepsSVG from "@assets/repetitions.svg";
import SeriesSVG from "@assets/series.svg";

export function Exercise() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  return (
    <VStack flex={1}>
      <VStack px={6} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={() => navigate("Home")}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack justifyContent="space-between" mt={6} mb={6} alignItems="center">
          <Heading
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
            flexShrink={1}
          >
            Puxada Frontal
          </Heading>

          <HStack alignItems="center">
            <BodySVG />
            <Text color="gray.200" ml={1} textTransform="uppercase">Costas</Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={6}>
        <Image
          w="full"
          h={80}
          source={{ uri: "https://www.origym.com.br/upload/remada-unilateral-3.png" }}
          alt="Nome do exercício"
          mb={3}
          resizeMode="cover"
          rounded="lg"
        />

        <Box bg="gray.600" rounded="md" pb={4} px={4}>
          <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
            <HStack>
              <SeriesSVG />
              <Text color="gray.200" ml={2}>3 séries</Text>
            </HStack>
            <HStack>
              <RepsSVG />
              <Text color="gray.200" ml={2}>12 repetições</Text>
            </HStack>
          </HStack>

          <Button title="Marcar como concluído" />
        </Box>
      </VStack>
    </VStack>
  )
}