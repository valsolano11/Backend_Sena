// Solamente se recibe correo @outlook
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/;

export const validarPassword = (password) => {
  return passwordRegex.test(password);
};
export const validarCorreo = (correo) => {
  return emailRegex.test(correo);
};

export const generarCodigo = () => {
  const carecteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let codigo = "";
  for (let i = 0; i < 6; i++) {
    const indiceAletorio = Math.floor(Math.random() * carecteres.length);
    codigo += carecteres.charAt(indiceAletorio);
  }
  return codigo;
};
