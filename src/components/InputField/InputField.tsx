import { FieldProps, ErrorMessage } from "formik";

interface IInputField extends FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  id: string;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  id,
  field,
  form,
}: IInputField) => {
  const errorMessage = form.touched[id] && form.errors[id];

  return (
    <div className="mb-4 w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      <input
        {...field}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
      />
      <ErrorMessage
        name={id}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;