import BackgroundImg from "@assets/background.png"
import LogoSVG from "@assets/logo.svg"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from "react-native"

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack bg="gray.700" flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="People at the Gym"
          resizeMode="contain"
          position="absolute"
        />

        <Center mt="32">
          <LogoSVG />
          <Text color="gray.100" fontSize="sm">Treine sua mente e seu corpo</Text>
        </Center>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <VStack
            pt="32"
            flex={1}
            px={6}
          >
            <Center>
              <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                Acesse sua conta
              </Heading>

              <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
              <Input placeholder="Senha" secureTextEntry />

              <Button title="Acessar" />
            </Center>

          </VStack>
        </ScrollView>

        <Center px={6} pb={16} mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button title="Criar conta" variant="outline" onPress={() => navigate("SignUp")} />
        </Center>
      </VStack >
    </TouchableWithoutFeedback >


  )
}