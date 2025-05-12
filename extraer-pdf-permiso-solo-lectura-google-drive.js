// Script para extraer un PDF de Google Drive con permiso de solo lectura
if (!window.__pdf_extractor_loaded) {
    window.__pdf_extractor_loaded = true;
    let trustedURL;
    if (window.trustedTypes && trustedTypes.createPolicy) {
        const policy = trustedTypes.createPolicy('myPolicy', {
            createScriptURL: (input) => input
        });
        trustedURL = policy.createScriptURL('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    } else {
        trustedURL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    }
    function getPDFFileName() {
        let el = document.querySelector('.a-b-K-T.a-b-cg-Zf');
        if (el && el.textContent && /\.pdf$/i.test(el.textContent.trim())) {
            return el.textContent.trim();
        }
        let title = document.title;
        if (/\.pdf$/i.test(title.trim())) {
            return title.trim();
        }
        let matches = window.location.href.match(/([^\/]+\.pdf)(?=([?#])|$)/i);
        if (matches && matches[1]) {
            return decodeURIComponent(matches[1]);
        }
        return 'documento_' + new Date().toISOString().slice(0,10) + '.pdf';
    }
    function descargarPDF() {
        function waitForAllImagesToLoad(callback) {
            let elements = Array.from(document.getElementsByTagName("img")).filter(img => /^blob:/.test(img.src));
            let unloaded = elements.filter(img => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0);
            if (unloaded.length === 0) {
                callback(elements);
                return;
            }
            let loadedCount = 0;
            unloaded.forEach(img => {
                img.onload = img.onerror = function() {
                    loadedCount++;
                    if (loadedCount === unloaded.length) {
                        setTimeout(() => callback(Array.from(document.getElementsByTagName("img")).filter(img => /^blob:/.test(img.src))), 3000);
                    }
                };
            });
        }
        waitForAllImagesToLoad(function(elements) {
            elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
            if (elements.length === 0) {
                alert('No se encontraron imágenes tipo blob en la página.');
                return;
            }
            function addImageToPDF(index, pdf) {
                if (index >= elements.length) {
                    let fileName = getPDFFileName();
                    pdf.save(fileName);
                    return;
                }
                let img = elements[index];
                let mmWidth = img.naturalWidth * 0.264583;
                let mmHeight = img.naturalHeight * 0.264583;
                let canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                let imgData = canvas.toDataURL("image/jpeg", 1.0);
                if (index === 0) {
                    pdf = new window.jspdf.jsPDF({
                        orientation: mmWidth > mmHeight ? 'l' : 'p',
                        unit: 'mm',
                        format: [mmWidth, mmHeight]
                    });
                } else {
                    pdf.addPage([mmWidth, mmHeight], mmWidth > mmHeight ? 'l' : 'p');
                }
                pdf.addImage(imgData, 'JPEG', 0, 0, mmWidth, mmHeight);
                setTimeout(() => addImageToPDF(index + 1, pdf), 100);
            }
            addImageToPDF(0);
        });
    }
    let jspdf = document.createElement("script");
    jspdf.onload = function() {
        descargarPDF();
    };
    jspdf.src = trustedURL;
    document.body.appendChild(jspdf);
} else {
    if (window.jspdf) {
        (function descargarPDF() {
            function waitForAllImagesToLoad(callback) {
                let elements = Array.from(document.getElementsByTagName("img")).filter(img => /^blob:/.test(img.src));
                let unloaded = elements.filter(img => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0);
                if (unloaded.length === 0) {
                    callback(elements);
                    return;
                }
                let loadedCount = 0;
                unloaded.forEach(img => {
                    img.onload = img.onerror = function() {
                        loadedCount++;
                        if (loadedCount === unloaded.length) {
                            setTimeout(() => callback(Array.from(document.getElementsByTagName("img")).filter(img => /^blob:/.test(img.src))), 300);
                        }
                    };
                });
            }
            waitForAllImagesToLoad(function(elements) {
                elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
                if (elements.length === 0) {
                    alert('No se encontraron imágenes tipo blob en la página.');
                    return;
                }
                function getPDFFileName() {
                    let el = document.querySelector('.a-b-K-T.a-b-cg-Zf');
                    if (el && el.textContent && /\.pdf$/i.test(el.textContent.trim())) {
                        return el.textContent.trim();
                    }
                    let title = document.title;
                    if (/\.pdf$/i.test(title.trim())) {
                        return title.trim();
                    }
                    let matches = window.location.href.match(/([^\/]+\.pdf)(?=([?#])|$)/i);
                    if (matches && matches[1]) {
                        return decodeURIComponent(matches[1]);
                    }
                    return 'documento_' + new Date().toISOString().slice(0,10) + '.pdf';
                }
                function addImageToPDF(index, pdf) {
                    if (index >= elements.length) {
                        let fileName = getPDFFileName();
                        pdf.save(fileName);
                        return;
                    }
                    let img = elements[index];
                    let mmWidth = img.naturalWidth * 0.264583;
                    let mmHeight = img.naturalHeight * 0.264583;
                    let canvas = document.createElement('canvas');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                    let imgData = canvas.toDataURL("image/jpeg", 1.0);
                    if (index === 0) {
                        pdf = new window.jspdf.jsPDF({
                            orientation: mmWidth > mmHeight ? 'l' : 'p',
                            unit: 'mm',
                            format: [mmWidth, mmHeight]
                        });
                    } else {
                        pdf.addPage([mmWidth, mmHeight], mmWidth > mmHeight ? 'l' : 'p');
                    }
                    
                    pdf.addImage(imgData, 'JPEG', 0, 0, mmWidth, mmHeight);
                    setTimeout(() => addImageToPDF(index + 1, pdf), 100);
                }
                addImageToPDF(0);
            });
        })();
    } else {
        alert('jsPDF aún no está disponible. Recarga la página si tienes problemas.');
    }
}