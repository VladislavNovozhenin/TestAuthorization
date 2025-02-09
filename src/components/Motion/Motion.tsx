import { motion } from "framer-motion";
import { ReactNode } from "react";
interface IMotion {
  children: ReactNode;
}
const Motion = ({ children }: IMotion) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-[470px] p-6 bg-gray-900 shadow-md rounded-xl w-96 mx-auto"
    >
      {children}
    </motion.div>
  );
};

export default Motion;
