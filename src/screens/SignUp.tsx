import BackgroundImg from "@assets/background.png"
import LogoSVG from "@assets/logo.svg"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { useNavigation } from "@react-navigation/native"

import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "@hooks/useAuth"
import { API } from "@services/api"
import { AppError } from "@utils/AppError"
import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from 'native-base'
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import * as yup from "yup"

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const SignUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o email").email("E-mail inválido"),
  password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
  password_confirm: yup.string().required("Confirme sua senha").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema)
  })

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true)

      await API.post("/users", { name, email, password })
      await signIn(email, password)
    } catch (err) {
      setIsLoading(false)

      const isAppError = err instanceof AppError
      const message = isAppError ? err.message : "Server Error. Try again later."

      toast.show({
        title: message,
        placement: "top",
        bg: "red.500"
      })
    }
  }

  const { goBack } = useNavigation()

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
            pt={16}
            flex={1}
            px={6}
          >
            <Center>
              <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                Crie sua conta
              </Heading>

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirme a senha"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    errorMessage={errors.password_confirm?.message}
                  />
                )}
              />

              <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} isLoading={isLoading} />
            </Center>

          </VStack>
        </ScrollView>

        <Center px={6} pb={16} mt={6}>
          <Button title="Voltar para o login" variant="outline" onPress={() => goBack()} />
        </Center>
      </VStack >
    </TouchableWithoutFeedback >


  )
}