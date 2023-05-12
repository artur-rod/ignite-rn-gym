import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const PHOTO_SIZE = 33

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView showsVerticalScrollIndicator={false} px={6}>
        <Center mt={6}>
          {
            photoIsLoading
              ? <Skeleton w={PHOTO_SIZE} h={PHOTO_SIZE} rounded="full" startColor="gray.600" endColor="gray.400" />
              : <UserPhoto size={PHOTO_SIZE} source={{ uri: "https://github.com/artur-rod.png" }} />
          }

          <TouchableOpacity>
            <Text color="green.500" fontFamily="heading" fontSize="md" mt={2} mb={8}>Alterar foto</Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="E-mail" bg="gray.600" isDisabled />
        </Center>

        <VStack mt={10} mb={6}>
          <Heading color="gray.200" fontFamily="heading" fontSize="md" mb={2}>Alterar foto</Heading>
          <Input placeholder="Senha antiga" bg="gray.600" />
          <Input placeholder="Nova senha" bg="gray.600" />
          <Input placeholder="Confirme a nova senha" bg="gray.600" />
        </VStack>

        <Button title="Atualizar" mb={8} />
      </ScrollView>
    </VStack>
  )
}