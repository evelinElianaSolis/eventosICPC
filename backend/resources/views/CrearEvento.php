
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Crear Evento</title>
</head>
<body>
<div class="sidebar">
        <div class="logo">ICPC-UMSS</div>
        <div class="menu">
            <a href="Index.html">Inicio</a>
            <a href="CrearEvento.html">Eventos</a>
            <a href="CrearTipo.html">Tipo de evento</a>
            <a href="competencias.php">Competencias</a>
        </div>
    </div>
    <main>
        <section class="tweet-composer">
            <div class="composer-form">
                <input type="text" id="titulo" name="titulo" placeholder="Título" required>
                <input type="datetime-local" id="fecha-hora" name="fecha-hora" required>
                <input type="text" id="ubicacion" name="ubicacion" placeholder="Ubicación">
                <textarea id="descripcion" name="descripcion" placeholder="Descripción" rows="4" required></textarea>
                
                <input type="file" id="icono-tipo" name="icono-tipo" accept="image/*" >
                <img id="imagen-preview" src="#" alt="Vista previa de la imagen" >

                <label for="privacidad">Privacidad:</label>
                <select id="privacidad" name="privacidad">
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                </select>
                <!-- Otras opciones aquí como configurar categorías, requisitos, etc. -->
                <div class="tweet-actions">
                    <button class="tweet-button">Crear Evento</button>
                </div>
            </div>
            
        </section>
        <aside class="news-section">
            <h2>Noticias</h2>
            <div class="news-item">
                <img src="noticia1.jpg" alt="Noticia 1">
                <p>¡Nueva actualización de la aplicación!</p>
            </div>
            <div class="news-item">
                <img src="noticia2.jpg" alt="Noticia 2">
                <p>Evento especial próximamente.</p>
            </div>
            <!-- Agrega más noticias según tus necesidades -->
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2023 ICPC-UMSS</p>
    </footer>
    <script src="image.js"></script>
    <script src="mi_script.js"></script>
    <script src="script.js"></script>
</body>
</html>