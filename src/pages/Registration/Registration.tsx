import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { fetchRegister } from "../../request";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InputField from "../../components/InputField/InputField";
import Motion from "../../components/Motion/Motion";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Введите правильный email")
    .required("Email обязателен"),
  password: Yup.string()
    .min(6, "Пароль должен содержать не менее 6 символов")
    .required("Пароль обязателен"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Пароли не совпадают")
    .required("Подтверждение пароля обязательно"),
});

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const errorMessage = await dispatch(
      fetchRegister(values.email, values.password)
    );

    if (!errorMessage) {
      toast.success("Registration was successful!", { theme: "colored" });
      navigate("/login"); //Если запрос успешно, переходим на логин
    } else {
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
      <>
        <legend className="text-2xl mb-5 font-semibold text-center">
          Регистрация
        </legend>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex-1 flex flex-col items-start">
              <Field
                name="email"
                id="email"
                placeholder="Введите email"
                label="Email"
                component={InputField}
              />
              <Field
                name="password"
                id="password"
                placeholder="Введите пароль"
                label="Пароль"
                type="password"
                component={InputField}
              />
              <Field
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Введите пароль еще раз"
                label="Подтвердите пароль"
                type="password"
                component={InputField}
              />

              <div className="flex mb-2">
                <span className="mr-2">Уже есть аккаунт?</span>
                <Link
                  className="underline text-gray-400 hover:text-blue-400"
                  to={"/login"}
                >
                  Войти
                </Link>
              </div>

              <button
                className="mt-auto  w-full rounded-lg border border-gray-400 px-4 py-2 text-lg font-medium transition hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                type="submit"
                disabled={isSubmitting}
              >
                Создать аккаунт
              </button>
            </Form>
          )}
        </Formik>
      </>
    </Motion>
  );
};

export default Registration;
