document.addEventListener("DOMContentLoaded", function () {
  const informarDados = document.getElementById("informarDados");
  const valorInput = document.getElementById("valor");
  const pixRadio = document.getElementById("pix");
  const cartaoRadio = document.getElementById("cartao");
  const pixPag = document.getElementById("pag-pix");
  const cartaoPag = document.getElementById("pag-cartao");
  const totalElement = document.getElementById("total");
  const numeroInput = document.getElementById("numero");
  const parcelasSelect = document.getElementById("parcelas");
  const pagarBtn = document.getElementById("pagar");
  const bandSpan = document.getElementById("bandIcon");
  const parcelasValores = document.getElementById("parcelasValores");

  function calcularTotalParcelas(valorNumerico, parcelas) {
    if (parcelas <= 3) {
      return valorNumerico;
    } else if (parcelas === 4) {
      return valorNumerico * 1.05;
    } else if (parcelas == 5) {
      return valorNumerico * 1.1;
    }
  }

  function mostrarPixPanel(valorNumerico) {
    pixPag.style.display = "block";
    cartaoPag.style.display = "none";
    const valorComDesconto = valorNumerico * 0.9;
    totalElement.textContent = `R$ ${valorComDesconto.toFixed(2)}`;
    parcelasValores.textContent = ""; // limpa os valores das parcelas
  }

  function mostrarCartaoPanel(valorNumerico) {
    pixPag.style.display = "none";
    cartaoPag.style.display = "flex";
    parcelasSelect.dispatchEvent(new Event("change"));
  }

  informarDados.addEventListener("click", function () {
    const valor = valorInput.value.trim(); // trim() remove espaços em branco

    if (valor === " ") {
      alert("o campo valor deve ser preenchido");
      return;
    }

    // verifica se o número é válido
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      alert("O campo valor deve conter um número válido");
      return;
    }

    if (pixRadio.checked) {
      mostrarPixPanel(valorNumerico);
    } else if (cartaoRadio.checked) {
      mostrarCartaoPanel(valorNumerico);
    }
  });

  numeroInput.addEventListener("input", function () {
    const numero = numeroInput.value; // pega o valor do input

    if (numero.startsWith("1234")) {
      bandSpan.innerHTML =
        '<img src="img/masterCardLogo.png" alt="MasterCard">';
    } else if (numero.startsWith("4321")) {
      bandSpan.innerHTML =
        '<img src="img/nubank-logo.png" alt="nubank">';
    } else if (numero.length >= 4) {
      bandSpan.textContent = "Número de cartão inválido";
    } else {
      bandSpan.innerHTML = ""; // limpa a mensagem quando a entrada é menor que 4 dígitos
    }
  });

  parcelasSelect.addEventListener("change", function () {
    const valor = parseFloat(valorInput.value.trim());
    const parcelas = parseInt(parcelasSelect.value);
    const total = calcularTotalParcelas(valor, parcelas);
    totalElement.textContent = `R$ ${total.toFixed(2)}`;

    let parcelasText = `${parcelas}x de R$ ${(total / parcelas).toFixed(2)};`;
    parcelasValores.textContent = parcelasText;
  });

  pagarBtn.addEventListener("click", function () {
    alert("pagamento realizado com sucesso ! ");
  });
});
