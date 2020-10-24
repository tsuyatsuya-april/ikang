function addComment(){
  const submit = document.getElementById("comment-submit");
  const eventPath = location.pathname;
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("show-comment"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", eventPath + "/comments" , true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const comment = XHR.response.comment;
      const list = document.getElementById("comment-add-list");
      const fromText = document.getElementById("comment-area");
      const HTML = `
        <div class="comment-detail">
          <div class="comment-name">
            名無しさん
          </div>
          <div class="show-comment">
            ${comment.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      fromText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", addComment);