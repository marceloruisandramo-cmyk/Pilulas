/**
 * Pílulas Jurídicas - app.js
 * JavaScript 100% Puro • Zero Dependências • Execução Local no Navegador
 */

(function () {
  "use strict";

  // Índice Estático de Artigos para Pesquisa Local Instantânea
  const artigos = [
    {
      titulo: "A Origem Histórica do Martelo dos Juízes (Gavel)",
      url: "artigos/origem-martelo-juizes.html",
      categoria: "Curiosidades Jurídicas",
      jurisdicao: "Common Law / EUA e Inglaterra",
      resumo: "Por que o martelo é tão famoso na cultura pop se na maioria dos países da Civil Law ele sequer é utilizado em audiências?",
      data: "15/09/2026"
    },
    {
      titulo: "Por Que a Deusa Têmis Usa Venda nos Olhos?",
      url: "artigos/deusa-temis-venda-olhos.html",
      categoria: "História do Direito",
      jurisdicao: "Direito Romano e Grego",
      resumo: "Nem sempre a personificação da Justiça foi cega. Entenda quando e por que a venda nos olhos foi adicionada no Renascimento.",
      data: "14/09/2026"
    },
    {
      titulo: "O Julgamento de Sócrates (399 a.C.): O Primeiro Grande Caso da História",
      url: "artigos/julgamento-de-socrates.html",
      categoria: "Casos Famosos",
      jurisdicao: "Grécia Antiga (Atenas)",
      resumo: "Como funcionou o tribunal dos 500 jurados atenienses que condenou à morte por cicuta um dos maiores filósofos de todos os tempos.",
      data: "12/09/2026"
    },
    {
      titulo: "A Regra de Miranda (1966) e o Direito de Permanecer em Silêncio",
      url: "artigos/regra-de-miranda-aviso.html",
      categoria: "Direito Penal",
      jurisdicao: "Estados Unidos",
      resumo: "A história real por trás da advertência 'Você tem o direito de permanecer em silêncio' estabelecida pela Suprema Corte dos EUA.",
      data: "10/09/2026"
    },
    {
      titulo: "Habeas Corpus: O Mais Antigo Remédio Constitucional em Vigor",
      url: "artigos/historia-habeas-corpus.html",
      categoria: "Direito Constitucional",
      jurisdicao: "Inglaterra / Internacional",
      resumo: "Das origens na Magna Carta de 1215 e no Habeas Corpus Act de 1679 à consagração global na tutela da liberdade de locomoção.",
      data: "08/09/2026"
    },
    {
      titulo: "A Lei de 1313 que Proíbe Armaduras no Parlamento Britânico",
      url: "artigos/lei-armaduras-parlamento-britanico.html",
      categoria: "Leis Curiosas",
      jurisdicao: "Reino Unido",
      resumo: "O 'Statute Forbidding Bearing of Armour' de Eduardo II continua formalmente em vigor após mais de 700 anos de história.",
      data: "05/09/2026"
    },
    {
      titulo: "O Caramujo na Garrafa de Cerveja: Donoghue v. Stevenson (1932)",
      url: "artigos/caso-donoghue-stevenson-caramujo.html",
      categoria: "Direito Civil",
      jurisdicao: "Escócia / Reino Unido",
      resumo: "O julgamento histórico na House of Lords que deu origem ao conceito moderno do dever de cuidado e responsabilidade do fornecedor.",
      data: "03/09/2026"
    },
    {
      titulo: "A História das Perucas nos Tribunais Britânicos",
      url: "artigos/historia-perucas-tribunais.html",
      categoria: "Tribunais",
      jurisdicao: "Reino Unido e Commonwealth",
      resumo: "A tradição iniciada no reinado de Carlos II no século XVII que sobrevive como símbolo de anonimato institucional e solenidade.",
      data: "01/09/2026"
    },
    {
      titulo: "O Julgamento de Animais nos Tribunais da Idade Média",
      url: "artigos/julgamentos-animais-idade-media.html",
      categoria: "Curiosidades Jurídicas",
      jurisdicao: "Europa Medieval",
      resumo: "Na Europa medieval, porcos, ratos e gafanhotos recebiam advogados de defesa nomeados pelo tribunal e eram formalmente julgados.",
      data: "28/08/2026"
    },
    {
      titulo: "O que Significa 'In Dubio Pro Reo' e sua Origem Romana?",
      url: "artigos/in-dubio-pro-reo-origem.html",
      categoria: "Termos Jurídicos",
      jurisdicao: "Direito Romano / Universal",
      resumo: "A evolução histórica do aforismo latino contido no Corpus Iuris Civilis que estabelece que na dúvida se deve favorecer o acusado.",
      data: "25/08/2026"
    }
  ];

  // Determinar caminho base relativo (se a página estiver dentro de /artigos/ ou /admin/)
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes("/artigos/") || path.includes("/admin/")) {
      return "../";
    }
    return "";
  }

  // Inicialização quando o DOM estiver pronto
  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initSearch();
    highlightActiveMenu();
  });

  // 1. Menu Mobile Simples e Acessível
  function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("navMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !isExpanded);
      menu.classList.toggle("open");
    });
  }

  // 2. Destacar Link Ativo na Navegação
  function highlightActiveMenu() {
    const path = window.location.pathname;
    const links = document.querySelectorAll(".nav-link");

    links.forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href) return;

      if (
        (href === "index.html" && (path.endsWith("/") || path.endsWith("/index.html"))) ||
        (href !== "index.html" && path.includes(href))
      ) {
        link.classList.add("active");
      }
    });
  }

  // 3. Sistema de Pesquisa Local em Memória (Sem Requisição de Rede)
  function initSearch() {
    const input = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("searchResults");
    if (!input || !resultsContainer) return;

    const basePath = getBasePath();

    input.addEventListener("input", function () {
      const query = input.value.trim().toLowerCase();

      if (query.length === 0) {
        resultsContainer.innerHTML = "";
        resultsContainer.classList.remove("active");
        return;
      }

      const matches = artigos.filter(function (art) {
        return (
          art.titulo.toLowerCase().includes(query) ||
          art.resumo.toLowerCase().includes(query) ||
          art.categoria.toLowerCase().includes(query) ||
          art.jurisdicao.toLowerCase().includes(query)
        );
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML =
          '<div class="search-empty">Nenhuma pílula jurídica encontrada para "' +
          escapeHtml(query) +
          '".</div>';
        resultsContainer.classList.add("active");
        return;
      }

      let html = "";
      matches.slice(0, 6).forEach(function (item) {
        const itemUrl = basePath + item.url;
        html +=
          '<a href="' + itemUrl + '" class="search-item">' +
          '<div class="search-item-cat">' + escapeHtml(item.categoria) + ' • ' + escapeHtml(item.jurisdicao) + '</div>' +
          '<div class="search-item-title">' + highlightText(item.titulo, query) + '</div>' +
          '</a>';
      });

      resultsContainer.innerHTML = html;
      resultsContainer.classList.add("active");
    });

    // Fechar resultados ao clicar fora
    document.addEventListener("click", function (event) {
      if (!input.contains(event.target) && !resultsContainer.contains(event.target)) {
        resultsContainer.classList.remove("active");
      }
    });
  }

  // Utilitário para escapar caracteres HTML
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Destacar o termo buscado
  function highlightText(text, query) {
    const escapedText = escapeHtml(text);
    const escapedQuery = escapeHtml(query);
    const regex = new RegExp("(" + escapedQuery + ")", "gi");
    return escapedText.replace(regex, "<strong style='color: #b45309;'>$1</strong>");
  }

  // Exportar lista para uso em outras páginas se necessário
  window.PilulasJuridicas = {
    artigos: artigos,
    getBasePath: getBasePath
  };
})();
