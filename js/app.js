fetch("data/portfolios.json")
  .then(res => res.json())
  .then(data => {

    const list = document.getElementById("list");
    const search = document.getElementById("search");

    if (list) {
      function render(items) {
        list.innerHTML = "";
        items.forEach(p => {
          list.innerHTML += `
            <div class="card">
              <h3>${p.nome}</h3>
              <p>${p.tema}</p>
              <p>${p.descricao}</p>
              <a href="portfolio.html?id=${p.id}">Ver portfólio</a>
            </div>
          `;
        });
      }

      render(data);

      search.addEventListener("input", () => {
        const value = search.value.toLowerCase();
        render(data.filter(p =>
          p.nome.toLowerCase().includes(value) ||
          p.tema.toLowerCase().includes(value)
        ));
      });
    }

    const container = document.getElementById("portfolio");
    if (container) {
      const id = new URLSearchParams(window.location.search).get("id");
      const p = data.find(x => x.id === id);

      if (!p) return;

      container.innerHTML = `
        <h1>${p.nome}</h1>
        <p>${p.tema}</p>
        <p>${p.descricao}</p>
        <a href="${p.link}" target="_blank">Visitar</a>
      `;

      document.querySelector("script[data-term]").setAttribute(
        "data-term",
        `portfolio-${p.id}`
      );
    }
  });
