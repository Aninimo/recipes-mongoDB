"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"
import { Header } from "./components/header";


interface Item {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: string;
}

export default function Home(){
  const [modalIsOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const carregarItems = async () => {
      try {
        const response = await axios.get("/api/food");
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load items:", error);
      }
    };

    carregarItems();
   }, []);

    function openModal(){
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false)
  }

  return(
    <div>
       <Header/>
       <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {items.map((item) => (
           <li key={item.id}>
             <div className="w-64 h-64 shadow-xl/30 p-4 rounded bg-zinc-800">
               <div className="flex justify-center items-center">
                 <Image
                   src={item.imageUrl}
                   alt={item.name}
                   width={100}
                   height={100}
                 />
               </div>
               <p className="mt-8 text-white">{item.description}</p>
               <button
                  onClick={openModal} 
                  className="px-24 py-2 rounded-lg bg-red-500 text-white mt-8 hover:bg-red-500 transition">
                  View
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
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={150}
                  height={150}
                />
                <p>{item.description}</p>
                <p>{item.ingredients}</p>
              </div>
            </Modal>
          </li>
        ))}
      </ul>
    </div>
  )
}