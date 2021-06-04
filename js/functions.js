//Función principal del sitio
function cambiarLinkVideo() {
    //Selecciona la clase, el link y el título de la clase
    var seleccionarClase = document.getElementById('seleccionarClase');
    var elVideo = document.getElementById('reproductorVideo');
    var elLink;

    elLink = seleccionarClase.options[seleccionarClase.selectedIndex].value;
    elVideo.src = elLink;
    
    //En caso de que el video no haya sido subido muestra una página con un mensaje de error
    if(seleccionarClase.options[seleccionarClase.selectedIndex].dataset.sinvideo != null){
        elVideo.src = "clase-no-subida.html";
    }

    var tituloClase = document.getElementById('tituloClase');
    var contenidoTitulo;

    contenidoTitulo = seleccionarClase.options[seleccionarClase.selectedIndex].title;
    tituloClase.innerHTML = contenidoTitulo;

    // Coloca el link del video de Drive debajo del iframe del video y en la nota de pie de página, en caso de que el vídeo sea de YouTube detecta el link y lo reemplaza por el correcto

    var linkDrive = document.getElementsByClassName('linkDrive');
    var linkDriveCorregido = elLink.replace("/preview", "/view");
    if (elLink.startsWith("https://www.youtube.com/embed/"))
    {
        var idVideoYoutube = elLink.substr(elLink.indexOf('/',29)+1);
        linkDrive[0].href = "https://www.youtube.com/watch?v="+idVideoYoutube;
        linkDrive[1].href = "https://www.youtube.com/watch?v="+idVideoYoutube;
        linkDrive[0].text = "haz click aquí para ver el vídeo en YouTube"
        linkDrive[1].text = "haz click aquí para verlo en YouTube"
    }else{
        linkDrive[0].href = linkDriveCorregido;
        linkDrive[1].href = linkDriveCorregido;
        linkDrive[0].text = "haz click aquí para ver el vídeo en Google Drive"
        linkDrive[1].text = "haz click aquí para verlo en Google Drive"
    }

    //Se fija que la opción del select tenga un PDF y agrega el link en un botón para que puedan acceder a el        
    var pdfClase = document.getElementById('pdfClase');
    var pdfLi = document.getElementById('pdfLi')
    var linkPDF;

    linkPDF = seleccionarClase.options[seleccionarClase.selectedIndex].dataset.pdf;
    pdfClase.href = linkPDF;

    if (linkPDF == '#'){
        pdfLi.style.display = "none";
    }else{
        pdfLi.style.display = "inline";
    }    

    //Se fija que la opción del select tenga un Jamboard y agrega el link en un botón para que puedan acceder a el  
    var jamboard = document.getElementById('jamboard');
    var jamboardLi = document.getElementById('jamboardLi');
    var linkJamboard;

    linkJamboard = seleccionarClase.options[seleccionarClase.selectedIndex].dataset.jamboard;
    jamboard.href = linkJamboard;
    
    if (linkJamboard == '#'){
        jamboardLi.style.display = "none";
    }else{
        jamboardLi.style.display = "inline";
    }
    
    //El vídeo en caso de no tener PDF ni Jamboard muestra un botón sin link para mostrar un mensaje de que el vídeo no tiene PDF ni Jamboard disponible
    var sinRecursos = document.getElementById('sinRecursos');
    if (linkJamboard == '#' && linkPDF == '#'){
        sinRecursos.style.display = "block";
    }else{
        sinRecursos.style.display = "none";
    } 
    
    // Selecciona el index de la opción anterior a la seleccionada y también el index de la opción siguiente para luego modificar el texto correspondiente y hacer una especie de slider
    var claseAnterior = document.getElementsByClassName('claseAnterior');
    var claseSiguiente = document.getElementsByClassName('claseSiguiente');

    var nombreClaseAnterior;
    var nombreClaseSiguiente;  

    if(seleccionarClase.selectedIndex < 1 ){
        nombreClaseAnterior = "No hay clase anterior";
    }else{
        nombreClaseAnterior = seleccionarClase.options[seleccionarClase.selectedIndex-1].text;                
    }

    if(seleccionarClase.selectedIndex == (seleccionarClase.options.length - 1)){
        nombreClaseSiguiente = "No hay clase siguiente";
    }else{
        nombreClaseSiguiente = seleccionarClase.options[seleccionarClase.selectedIndex+1].text;                
    } 
    
    claseAnterior[0].innerHTML = nombreClaseAnterior;
    claseAnterior[1].innerHTML = nombreClaseAnterior;
    claseSiguiente[0].innerHTML = nombreClaseSiguiente;
    claseSiguiente[1].innerHTML = nombreClaseSiguiente;
}

//Selecciona la siguiente opción del select y aplica la función principal
function siguienteClase(){
    if(seleccionarClase.selectedIndex >= (seleccionarClase.options.length-1)){

    }else{
        seleccionarClase.selectedIndex += 1;
        cambiarLinkVideo();                         
    }
}

//Selecciona la opción anterior del select y aplica la función principal
function claseAnterior(){
    if(seleccionarClase.selectedIndex < 1){

    }else{
        seleccionarClase.selectedIndex -= 1;
        cambiarLinkVideo();         
    }
}