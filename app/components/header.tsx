"use client"

import { useEffect, useState } from "react"
import axios from "axios";
import Modal from "react-modal"

export function Header(){
  const [modalIsOpen, setIsOpen] = useState(false)
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [preparation, setPreparation] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  
  function openModal(){
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false)
  }

  useEffect(() => {
    Modal.setAppElement("body")
  }, [])

  async function saveFood() {
    if (!name) return;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("preparation", preparation);

    if (image) {
      formData.append("image", image);
    }

    await axios.post("/api/food", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");

    closeModal();
  }

  return(
    <div>
      <div className="flex justify-between p-4">
        <h1 className="font-bold text-2xl text-white">🍽️ Recipes</h1>
        <button
          className="px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition" 
          onClick={openModal}>
          Add recipe
        </button>
      </div>
       <Modal
         isOpen={modalIsOpen}
         onRequestClose={closeModal}
         closeTimeoutMS={300}
         overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
         className={`outline-none transition-all duration-300 ${
            modalIsOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
       >
         <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
           <h2 className="text-xl font-semibold text-gray-800">Recipes</h2>
           <div>
             <label className="text-sm text-gray-600">Name</label>
             <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Enter name"
               className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

             <label className="text-sm text-gray-600">Descrption</label>
             <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the description here..."
                className="w-full h-22 p-2 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

             <label className="text-sm text-gray-600">Ingredients</label>
             <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Write the ingredients here..."
                className="w-full h-22 p-2 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

             <label className="text-sm text-gray-600">Preparation method</label>
             <textarea
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                placeholder="Write the description here..."
                className="w-full h-22 p-2 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             />

             <label className="text-sm text-gray-600">Image</label>
             <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => {
                   if (e.target.files?.[0]) {
                     setImage(e.target.files[0]);
                   }
                 }}
                className="w-full rounded-lg border border-gray-300 p-2"
             />
           </div>
           <button
             type="button"
             onClick={saveFood}
             className="px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition"
           >
            Save
           </button>
         </form>
       </Modal>
    </div>
  )
}