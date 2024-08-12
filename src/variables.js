const permisos = [
{'permisoName': 'VER LOS USUARIOS', 'permisoDescription': 'P_USUARIO'},
{'permisoName': 'AGREGAR LOS USUARIOS', 'permisoDescription': 'P_USUARIO'},
{'permisoName': 'EDITAR LOS USUARIOS', 'permisoDescription': 'P_USUARIO'},

{'permisoName': 'VER LOS ROLES', 'permisoDescription': 'P_ROL'},
{'permisoName': 'AGREGAR LOS ROLES', 'permisoDescription': 'P_ROL'},
{'permisoName': 'EDITAR LOS ROLES', 'permisoDescription': 'P_ROL'},

{'permisoName': 'VER LOS CATEGORIAS', 'permisoDescription': 'P_CATEGORIA'},
{'permisoName': 'AGREGAR LOS CATEGORIAS', 'permisoDescription': 'P_CATEGORIA'},
{'permisoName': 'EDITAR LOS CATEGORIAS', 'permisoDescription': 'P_CATEGORIA'},

{'permisoName': 'VER LOS SUBCATEGORIAS', 'permisoDescription': 'P_SUBCATEGORIA'},
{'permisoName': 'AGREGAR LOS SUBCATEGORIAS', 'permisoDescription': 'P_SUBCATEGORIA'},
{'permisoName': 'EDITAR LOS SUBCATEGORIAS', 'permisoDescription': 'P_SUBCATEGORIA'},

{'permisoName': 'VER LOS FICHAS', 'permisoDescription': 'P_FICHA'},
{'permisoName': 'AGREGAR LOS FICHAS', 'permisoDescription': 'P_FICHA'},
{'permisoName': 'EDITAR LOS FICHAS', 'permisoDescription': 'P_FICHA'},

{'permisoName': 'VER LOS INSTRUCTORES', 'permisoDescription': 'P_INSTRUCTOR'},
{'permisoName': 'AGREGAR LOS INSTRUCTORES', 'permisoDescription': 'P_INSTRUCTOR'},
{'permisoName': 'EDITAR LOS INSTRUCTORES', 'permisoDescription': 'P_INSTRUCTOR'},

{'permisoName': 'VER LOS UNIDADES DE MEDIDAS', 'permisoDescription': 'P_UM'},
{'permisoName': 'AGREGAR LOS UNIDADES DE MEDIDAS', 'permisoDescription': 'P_UM'},
{'permisoName': 'EDITAR LOS UNIDADES DE MEDIDAS', 'permisoDescription': 'P_UM'},

{'permisoName': 'VER LOS PRODUCTOS', 'permisoDescription': 'P_PRODUCTO'},
{'permisoName': 'AGREGAR LOS PRODUCTOS', 'permisoDescription': 'P_PRODUCTO'},
{'permisoName': 'EDITAR LOS PRODUCTOS', 'permisoDescription': 'P_PRODUCTO'},

{'permisoName': 'VER LOS HERRAMIENTAS', 'permisoDescription': 'P_HERRAMIETA'},
{'permisoName': 'AGREGAR LOS HERRAMIENTAS', 'permisoDescription': 'P_HERRAMIETA'},
{'permisoName': 'EDITAR LOS HERRAMIENTAS', 'permisoDescription': 'P_HERRAMIETA'},

{'permisoName': 'VER LOS PRESTAMOS', 'permisoDescription': 'P_PRESTAMO'},
{'permisoName': 'AGREGAR LOS PRESTAMOS', 'permisoDescription': 'P_PRESTAMO'},
{'permisoName': 'EDITAR LOS PRESTAMOS', 'permisoDescription': 'P_PRESTAMO'},

{'permisoName': 'VER LOS PEDIDO', 'permisoDescription': 'P_PEDIDO'},
{'permisoName': 'AGREGAR LOS PEDIDO', 'permisoDescription': 'P_PEDIDO'},
{'permisoName': 'EDITAR LOS PEDIDO', 'permisoDescription': 'P_PEDIDO'},

{'permisoName': 'VER LOS HISTORIA', 'permisoDescription': 'P_HISTORIAL'},

{'permisoName': 'VER LOS ESTADO', 'permisoDescription': 'P_ESTADO'},

{'permisoName': 'VER LOS PERMISOS', 'permisoDescription': 'P_PERMISO'},
{'permisoName': 'ASIGNAR PERMISO', 'permisoDescription': 'P_PERMISO'},
]


const roles = [
    {'rolName': 'ADMIN'},
    {'rolName': 'USUARIO'},
    {'rolName': 'SUBADMINISTRADOR'},
]

const insertarUnidades = [
    // Unidades de volumen
    { 'tipo': 'volumen', 'sigla': 'gal', 'nombre': 'Galón', 'equivalencia': 3.78541 },
    { 'tipo': 'volumen', 'sigla': 'l', 'nombre': 'Litro', 'equivalencia': 1 },
    { 'tipo': 'volumen', 'sigla': 'ml', 'nombre': 'Mililitro', 'equivalencia': 0.001 },
    { 'tipo': 'volumen', 'sigla': 'cc', 'nombre': 'Centímetro cúbico', 'equivalencia': 0.001 },

    // Unidades de masa
    { 'tipo': 'masa', 'sigla': 'kg', 'nombre': 'Kilogramo', 'equivalencia': 1 },
    { 'tipo': 'masa', 'sigla': 'g', 'nombre': 'Gramo', 'equivalencia': 0.001 },
    { 'tipo': 'masa', 'sigla': 'lb', 'nombre': 'Libra', 'equivalencia': 0.453592 },
    { 'tipo': 'masa', 'sigla': 'oz', 'nombre': 'Onza', 'equivalencia': 0.0283495 },

    // Unidades de longitud
    { 'tipo': 'longitud', 'sigla': 'm', 'nombre': 'Metro', 'equivalencia': 1 },
    { 'tipo': 'longitud', 'sigla': 'cm', 'nombre': 'Centímetro', 'equivalencia': 0.01 },
    { 'tipo': 'longitud', 'sigla': 'mm', 'nombre': 'Milímetro', 'equivalencia': 0.001 },
    { 'tipo': 'longitud', 'sigla': 'in', 'nombre': 'Pulgada', 'equivalencia': 0.0254 },
    { 'tipo': 'longitud', 'sigla': 'ft', 'nombre': 'Pie', 'equivalencia': 0.3048 },

    // Unidades de temperatura
    { 'tipo': 'temperatura', 'sigla': 'C', 'nombre': 'Celsius', 'equivalencia': null },
    { 'tipo': 'temperatura', 'sigla': 'F', 'nombre': 'Fahrenheit', 'equivalencia': null },
    { 'tipo': 'temperatura', 'sigla': 'K', 'nombre': 'Kelvin', 'equivalencia': null },
];

export const defaultVariables ={
    permisos,
    roles,
    insertarUnidades
} 