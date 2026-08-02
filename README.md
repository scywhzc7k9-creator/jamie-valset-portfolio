# Portafolio profesional de Jamie Valset

Sitio web bilingüe, de una sola página y organizado mediante pestañas. Está preparado para publicarse como un repositorio independiente en GitHub Pages.

## 1. Video de HeyGen

1. Exporta el video en formato MP4.
2. Renómbralo exactamente como:

   `intro-jamie-valset.mp4`

3. Súbelo dentro de:

   `assets/video/intro-jamie-valset.mp4`

El lugar está claramente marcado en `index.html` con el comentario `INSERTA AQUÍ TU VIDEO DE HEYGEN`.

## 2. Formulario de contacto sin mostrar el correo

El formulario está preparado para Formspree. Para activarlo:

1. Crea una cuenta en Formspree con el correo que recibirá los mensajes.
2. Crea un formulario nuevo.
3. Copia el identificador o endpoint asignado.
4. En `index.html`, busca:

   `https://formspree.io/f/REEMPLAZA_CON_TU_ID`

5. Sustituye `REEMPLAZA_CON_TU_ID` por el identificador real.

El correo receptor no se muestra en la página.

## 3. Crear un repositorio nuevo

1. En GitHub pulsa **New repository**.
2. Nombre sugerido: `jamie-valset-portfolio`.
3. Selecciona **Public** para utilizar GitHub Pages gratuitamente.
4. No agregues README, licencia ni `.gitignore` al crearlo.
5. Sube todo el contenido de esta carpeta, asegurándote de que `index.html` quede en la raíz.
6. Confirma con **Commit changes**.
7. Ve a **Settings → Pages**.
8. En Source selecciona **Deploy from a branch**.
9. Selecciona `main` y `/ (root)`.
10. Guarda y espera la publicación.

La dirección inicial será similar a:

`https://TU-USUARIO.github.io/jamie-valset-portfolio/`

## 4. Dominio o subdominio opcional

Para mantener este portafolio separado de la plataforma de estudiantes, se recomienda usar un subdominio, por ejemplo:

`perfil.valset.host`

En el repositorio, en **Settings → Pages → Custom domain**, escribe el subdominio. Después crea en Squarespace un registro CNAME:

- Nombre: `perfil`
- Datos: `TU-USUARIO.github.io`

No uses `valset.host` como dominio raíz porque actualmente corresponde a la plataforma de estudiantes.

## 5. Archivos incluidos

- `index.html`: página bilingüe completa.
- `assets/css/styles.css`: diseño responsive.
- `assets/js/app.js`: pestañas, menú e idioma.
- `assets/img/`: marca y favicon.
- `assets/video/`: ubicación del video.
- `assets/docs/`: CV en español e inglés.

## Nota de privacidad

El sitio no muestra domicilio, teléfono ni correo personal. Los CV incluidos son los archivos originales facilitados para el proyecto y sí pueden contener datos de contacto dentro del PDF. Si se desea privacidad total, conviene sustituirlos por versiones públicas sin domicilio, teléfono ni correo.

## Certificaciones incorporadas

La sección de certificaciones incluye documentos y constancias de UBAM, Oxford University Press, Angloeducativo, SmartPro y Cursa/SENATI. Los archivos se encuentran en:

- `assets/img/certificates/`
- `assets/docs/certificates/`

## Video de HeyGen

Cuando el video esté listo, expórtalo en MP4 con el nombre exacto:

`intro-jamie-valset.mp4`

Después súbelo en:

`assets/video/intro-jamie-valset.mp4`

No necesitas modificar `index.html`; el reproductor ya está configurado.

## Identidad visual
El logotipo oficial de VALSET se encuentra en `assets/img/valset-logo.png`. El favicon utiliza `assets/img/favicon.png`.
