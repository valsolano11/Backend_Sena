//NO TOCAR ESTO

import nodemailer from "nodemailer";
// Parte de codigo donde se envia lo del correo
export const enviarCorreo = (text, email, subject = "Sistema Inventario Mobiliario SENA") =>{
return new Promise(async(resolve, reject)=>{

// Lo de configNodemailer se saco de investigación
    try {
        const configNodemailer = {
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "inventariodelmobiliario@gmail.com", // tu correo electrónico
            pass: "xieo yngh kruv rsta", // tu contraseña
          },
        };

        //Transport data funciona para la tranferencia y comunicacion del correo con el sistema
        const  transportData = nodemailer.createTransport(configNodemailer);
        
        //Aqui va el email donde va salir el mensaje y el que tiene la clave de seguridad activa
        const message = {
          from: "inventariodelmobiliario@gmail.com",
          to: email,
          subject,
          text,
        };

        const infoResponse = await transportData.sendMail(message);
        
        resolve(infoResponse)
    } catch (error) {
        reject(error);
    }
})
}

/* 
# info google 

EMAIL_USER = josearmandoavendanosaucedo6@gmail.com|
EMAIL_PASS = mikz cdom wrax qsdj #codigo de seguridad de google

EMAIL_USER = inventariodelmobiliario@gmail.com
EMAIL_PASS = xieo yngh kruv rsta


ruta para genrar el codigo == https://support.google.com/mail/answer/185833?hl=es-419
*/