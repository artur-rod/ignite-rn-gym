import * as FileSystem from "expo-file-system";
import { FileInfo } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

const PHOTO_SIZE = 33

export function Profile() {
  const [profilePicture, setProfilePicture] = useState("https://github.com/artur-rod.png")
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true)
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (selectedPhoto.canceled) return

      if (selectedPhoto.assets[0].uri) {
        const photoURI = selectedPhoto.assets[0].uri

        const photoInfo = await FileSystem.getInfoAsync(photoURI) as FileInfo
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Tamanho limite de 5 MB",
            placement: "top",
            bgColor: "red.500"
          })
        }

        setProfilePicture(photoURI)
        return toast.show({
          title: "Imagem alterada com sucesso",
          placement: "top",
          bgColor: "green.500"
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack flex={1}>
        <ScreenHeader title="Perfil" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustKeyboardInsets={true}
          px={6}>
          <Center mt={6}>
            {
              photoIsLoading
                ? <Skeleton w={PHOTO_SIZE} h={PHOTO_SIZE} rounded="full" startColor="gray.600" endColor="gray.400" />
                : <UserPhoto size={PHOTO_SIZE} source={{ uri: profilePicture }} />
            }

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text color="green.500" fontFamily="heading" fontSize="md" mt={2} mb={8}>Alterar foto</Text>
            </TouchableOpacity>

            <Input placeholder="Nome" bg="gray.600" />
            <Input placeholder="E-mail" bg="gray.600" isDisabled />
          </Center>

          <VStack mt={10} mb={6}>
            <Heading color="gray.200" fontFamily="heading" fontSize="md" mb={2}>Alterar senha</Heading>
            <Input placeholder="Senha antiga" bg="gray.600" />
            <Input placeholder="Nova senha" bg="gray.600" />
            <Input placeholder="Confirme a nova senha" bg="gray.600" />
          </VStack>

          <Button title="Atualizar" mb={8} />
        </ScrollView>
      </VStack>
    </TouchableWithoutFeedback>
  )
}