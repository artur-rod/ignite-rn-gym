import BackgroundImg from "@assets/background.png"
import LogoSVG from "@assets/logo.svg"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { AppError } from "@utils/AppError"

import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import * as yup from "yup"

type FormDataProps = {
  email: string;
  password: string;
}

const SignInSchema = yup.object({
  email: yup.string().required("Informe seu e-mail").email("E-mail-inválido"),
  password: yup.string().required("Informe sua senha")
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(SignInSchema)
  })

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (err) {
      const isAppError = err instanceof AppError
      const title = isAppError ? err.message : "Sign In Failed. Try again later."

      setIsLoading(false)

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500"
      })
    }
  }

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

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                    onSubmitEditing={handleSubmit(handleSignIn)}
                    returnKeyType="send"
                  />
                )}
              />

              <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
            </Center>

          </VStack>
        </ScrollView>

        <Center px={6} pb={16} mt={6}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button title="Criar conta" variant="outline" onPress={() => navigate("SignUp")} />
        </Center>
      </VStack >
    </TouchableWithoutFeedback >


  )
}