import React from "react";

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  //When clicking outside modal, this will be dispatched
  const closeModal = (e: React.MouseEvent): void => {
    const bg = document.querySelector("#background");
    if (e.target === bg) {
      const modal = document.querySelector("#modal");

      modal!.classList.add("hidden");
    }
  };

  return (
    <div className="hidden" id="modal" onClick={(e) => closeModal(e)}>
      <div
        id="background"
        className="flex justify-center items-center w-full h-full z-10 bg-opacity-50 absolute bg-black"
      >
        <div className="modal flex flex-col z-20 justify-center items-center p-4 rounded-md bg-white text-slate-800">
          <h2
            className="
        font-bold text-blue-900 text-xl"
          >
            Editando...
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
