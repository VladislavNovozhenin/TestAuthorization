import { fetchLogin } from "../../request";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InputField from "../../components/InputField/InputField";
import Motion from "../../components/Motion/Motion";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Введите правильный email")
    .required("Email обязателен"),
  password: Yup.string()
    .min(6, "Пароль должен содержать не менее 6 символов")
    .required("Пароль обязателен"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const errorMessage = await dispatch(
      fetchLogin(values.email, values.password)
    );
    if (errorMessage) {
      toast.error(errorMessage, { theme: "colored" }); //Если запрос не прошел или неверный выводим сообщение
    }
  };

  if (isAuthLoading)
    return (
      <motion.div
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    );
  return (
    <Motion>
      <legend className="text-2xl mb-5 font-semibold text-center">Вход</legend>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-1 flex-col items-start">
            <Field
              name="email"
              label="Email"
              placeholder="Введите email"
              id="email"
              component={InputField}
            />
            <Field
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              id="password"
              component={InputField}
            />
            <Link
              className="underline text-gray-400 hover:text-blue-400"
              to={"/registration"}
            >
              Создать аккаунт
            </Link>
            <button
              disabled={isSubmitting}
              className="mt-auto w-full rounded-lg border border-gray-400 px-4 py-2 text-lg font-medium transition hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </Motion>
  );
};

export default Login;
