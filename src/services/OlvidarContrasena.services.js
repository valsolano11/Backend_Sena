import Usuario from "../models/Usuario.js"
import Rol from "../models/Rol.js";
import bcrypt from 'bcryptjs';
import { validadCorreo, validadPassword } from "../helpers/OlvidarContrasena.helpers.js";


const saltos = bcrypt.genSaltSync(10)

export const posUsuariosService = (data) =>{
    return new Promise(async(resolve, reject)=>{
        const{
            correo: email,
            password,
            RolId
        } = data
        const emailLower = email.toLowerCase()
        try {
            const isInto = await Usuario.findOne({
                where: {
                    Documento: Documento,
                    correo: emailLower
                }
            })
            const existeRol = await Rol.findByPk(RolId)

            if(!existeRol){
                return resolve({
                    ok:false,
                    message: "Rol no encontrado"
                })
            }
            if(isInto){
                return resolve({
                    ok: false,
                    message: 'Correo o Documento ya en uso'
                })
            }
            if (!validadCorreo(correo)){
                return resolve({
                    ok:false,
                    message: `correo ${correo} es invalido, solo se recibe correo microsoft o que son parte del sena`
                })
            }
            if(!validadPassword(password)){
                return resolve({
                    ok:false,
                    message:' Constraseña invalida'
                })
            }
            const passwordHast = bcrypt.hashSync(password, saltos)
        } catch (error) {
            reject(error)
        }
    })
}


export const getUsuarioService = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const usuario = await Usuario.findByPk(idUser);
      if (!usuario) {
        return resolve({
          ok: false,
          message: "usuario no encontrado",
        });
      }

      resolve({
        ok: true,
        messge: "usuario obtenido",
        data: usuario,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const putUsuarioService = (idUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        const usuario = await Usuario.findByPk(idUser);
        if (!usuario) {
          return resolve({
            ok: false,
            message: "usuario no encontrado",
          });
        }
        
        await usuario.update(idUser);

        resolve({
          ok: true,
          messge: "usuario actualizado",
          data: usuario,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  