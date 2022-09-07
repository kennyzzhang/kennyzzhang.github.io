window.addEventListener('DOMContentLoaded', (e) => {
  let parser = new DOMParser();
  [...document.getElementsByClassName('include')].map(async elt => {
    let classes = [...elt.classList.values()];
    let include_class_name = classes.find(s => s.startsWith('include_'));
    let include_name = include_class_name.replace(/^include_/, '');
    let include_file_name = include_name + '.html';
    let include_response = await fetch(include_file_name);
    let include_text = await include_response.text();
    let include_doc = parser.parseFromString(include_text, 'text/html');
    document.head.append(...include_doc.head.children);
    let include_elt = include_doc.getElementById(include_name);
    include_elt.removeAttribute('id');
    include_elt.classList.add(include_name);
    elt.replaceWith(include_elt);
  });
});
