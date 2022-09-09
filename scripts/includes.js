window.addEventListener('DOMContentLoaded', (e) => {
  let parser = new DOMParser();
  [...document.getElementsByClassName('include')].map(async elt => {
    let classes = [...elt.classList.values()];
    let include_class_name = classes.find(s => s.startsWith('include_'));
    let include_name = include_class_name.replace(/^include_/, '');
    let include_file_name = include_name + '.html';
    let include_response = await fetch(include_file_name);
    if (!include_response.ok) {
      console.warn(`Failed to fetch ${include_file_name}`);
      return;
    }
    let include_text = await include_response.text();
    let include_doc = parser.parseFromString(include_text, 'text/html');
    let include_elt = include_doc.getElementById(include_name);
    if (include_elt === null) {
      console.warn(`Failed to find include element for ${include_name}`);
      return;
    }
    include_elt.removeAttribute('id');
    include_elt.classList.add(include_name);
    head_elts = [...include_doc.head.children];
    head_elts_loaded = Promise.all(head_elts.map(head_elt => new Promise((resolve, reject) => {
      head_elt.addEventListener('load', (evt) => {console.log(evt); console.log(head_elt); resolve()});
    }))).then(() => {
      elt.replaceWith(include_elt);
    });
    document.head.append(...head_elts);
  });
});
