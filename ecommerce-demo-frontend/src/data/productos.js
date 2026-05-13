const BASE = import.meta.env.BASE_URL;

export const productos = [
  {
    id: 1,
    nombre: "Ravioles de carne",
    precio: 3500,
    imagen: `${BASE}img1.png`,
    etiqueta: "Artesanal",
    descripcion: "Rellenos de carne caseros, elaborados con ingredientes frescos."
  },
  {
    id: 2,
    nombre: "Ñoquis",
    precio: 3000,
    imagen: `${BASE}img3.png`,
    etiqueta: "Casero",
    descripcion: "Rellenos de carne caseros, elaborados con ingredientes frescos."
  },
  {
    id: 3,
    nombre: "Sorrentinos",
    precio: 4000,
    imagen: `${BASE}sorrentinos-1.png`,
    etiqueta: "Artesanal",
    descripcion: "Rellenos de carne caseros, elaborados con ingredientes frescos."
  },
  {
    id: 4,
    nombre: "Fideos cinta",
    precio: 2500,
    imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    descripcion: "Rellenos de carne caseros, elaborados con ingredientes frescos."
  },
  {
    id: 5,
    nombre: "Milanesas de soja",
    precio: 2800,
    imagen: `${BASE}mila-soja-1.png`,
    etiqueta: "Casero",
    descripcion: "Rellenos de carne caseros, elaborados con ingredientes frescos."
  },
];