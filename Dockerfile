# Usa la imagen base de Node.js con Alpine
FROM node:18

# Establece el directorio de trabajo en /app dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY backend/package*.json ./backend/

# Instala las dependencias
RUN npm install --prefix backend

# Copia todo el proyecto al contenedor
COPY . .

# Ejecuta el build dentro de /app/backend
RUN npm run build --prefix backend

# Expone el puerto
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start", "--prefix", "backend"]