export function modal(contentId){
    const contentTemplateEl = document.getElementById(contentId);
    showModal(contentTemplateEl);
}

export function showModal(contentTemplateEl){
    const contentElement = document.importNode(contentTemplateEl.content , true);
    const loader = contentElement.querySelector(".loader");
    const backdrop = contentElement.querySelector(".backdrop");

    document.body.insertAdjacentElement('afterbegin',loader);
    document.body.insertAdjacentElement('afterbegin',backdrop);
}

export function hideModal(){
    const loader = document.querySelector(".loader");
    const backdrop = document.querySelector(".backdrop");

    if(loader && backdrop) {
        loader.remove();
        backdrop.remove();
    }
}

export function domRender(){
    console.log("i was running");
    window.addEventListener('DOMContentLoaded' ,()=>{
        modal('modal-template')
        setTimeout(()=>{
            hideModal();
        },2000)
    })
}