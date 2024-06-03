export const convertToImage = (base64String,containerImg) =>{
    const src = `data:image/png;base64,${base64String}`;
    let newResult = document.createElement("div");
    newResult.classList.add('preview-container');
    newResult.innerHTML = `<img class="imgFrame" src="../assets/marco.png">
                           <div class="preview">
                              <img class="imgPreview" src="${src}">
                           </div>` 
    containerImg.appendChild(newResult);
    return containerImg;
}


