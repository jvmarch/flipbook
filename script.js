const url = "COLE_AQUI_SEU_LINK_DO_PDF";

let pdfDoc = null;
let pageNum = 1;

const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

// carrega o PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  renderPage(pageNum);
});

function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: 1.5 });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    page.render({
      canvasContext: ctx,
      viewport: viewport
    });
  });
}

function nextPage() {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  renderPage(pageNum);
}

function prevPage() {
  if (pageNum <= 1) return;
  pageNum--;
  renderPage(pageNum);
}
