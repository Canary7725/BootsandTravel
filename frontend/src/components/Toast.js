import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      className={"z-100"}
      position={"bottom-right"}
      hideProgressBar={false}
      autoClose={2000}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
    />
  );
};

export default Toast;
