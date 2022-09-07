window.addEventListener('DOMContentLoaded', (e) => {
  let parser = new DOMParser();
  Array.from(document.getElementsByClassName('include')).map(async elt => {
    let classes = Array.from(elt.classList.values());
    let include_class_name = classes.find(s => s.startsWith('include_'));
    let include_name = include_class_name.replace(/^include_/, '') + '.html';
    let include_response = await fetch(include_name);
    let include_text = include_response.text();
    let include_doc = parser.parseFromString(include_text, 'text/html');
    let include_elt = include_doc.getElementById(include_name);
    include_elt.removeAttribute('id');
    include_elt.classList.add(include_class_name);
    elt.replaceWith(include_elt);
  });
});
