document.getElementById("imageForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    let imageResultDiv = document.getElementById("imageResult");
    imageResultDiv.innerHTML = "<p class='text-info'>Wird verarbeitet...</p>";
    
    let response = await fetch("/process_image", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        let blob = await response.blob();
        let imgUrl = URL.createObjectURL(blob);
        imageResultDiv.innerHTML = `<img src="${imgUrl}" class="img-fluid mt-3" alt="Graustufenbild">`;
    } else {
        imageResultDiv.innerHTML = `<p class='text-danger'>Fehler beim Hochladen.</p>`;
    }
});
