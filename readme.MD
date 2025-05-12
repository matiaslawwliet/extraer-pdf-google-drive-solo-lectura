# Extraer PDF sin descarga (Google Drive)
Este es un pequeño script que puede utilizarse en navegadores basados en Chromium o Firefox para descargar un PDF generado a partir de las imágenes blob que el visor de Google Drive crea al visualizar archivos PDF protegidos.

## ¿Cómo funciona?
El script detecta todas las imágenes tipo blob que Google Drive utiliza para mostrar cada página del PDF en modo solo lectura, las ordena correctamente y genera un nuevo PDF con el mismo nombre que el documento original.

## Instrucciones de uso
1. **Abre el PDF** en Google Drive (en el visor, no en Google Docs).
2. **Haz scroll manualmente** por todas las páginas (hasta el final) para asegurarte de que todas las imágenes se carguen.
3. **Abre la consola** de tu navegador presionando la tecla F12.
4. **Pega y ejecuta el script** (`extraer-pdf-permiso-solo-lectura-google-drive.js`).
5. El PDF se descargará automáticamente con el nombre original.

## Requisitos
- Navegador basado en Chromium (Chrome, Edge, Brave, Opera, etc.) o Firefox.
- Acceso al visor de PDF de Google Drive.

## Notas
- El script solo descargará las páginas que hayan sido cargadas (haz scroll hasta el final del documento).
- El PDF puede contener más páginas que las que se ven en el visor, por un tema de redimensionamiento de las imágenes.
- Si el PDF tiene muchas páginas, puede tardar un poco en descargarse.