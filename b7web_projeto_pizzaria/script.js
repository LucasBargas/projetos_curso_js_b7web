const cart = [];
let modalQt = 1;
let modalKey = 0;

const qS = el => document.querySelector(el);
const qSA = el => document.querySelectorAll(el);
const events = ['touchstart', 'click'];

// Listagem das pizzas
pizzaJson.map((item, index) => {
  const pizzaItem = qS('.models .pizza-item').cloneNode(true);

  // preencher as informações pizza item
  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  // modal
  events.forEach(userEvent => {
    pizzaItem.querySelector('a').addEventListener(userEvent, e => {
      e.preventDefault();
      const key = e.target.closest('.pizza-item').getAttribute('data-key');
      modalQt = 1;
      modalKey = key;

      qS('.pizzaBig img').src = pizzaJson[key].img;
      qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
      qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
      qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.', ',')}`;
      qS('.pizzaInfo--size.selected').classList.remove('selected');
      qSA('.pizzaInfo--size').forEach((size, sizeIndex) => {
        if (sizeIndex === 2) {
          size.classList.add('selected');
        }
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
      })

      qS('.pizzaInfo--qt').innerHTML = modalQt;

      qS('.pizzaWindowArea').style.opacity = 0;
      qS('.pizzaWindowArea').style.display = 'flex';
      setTimeout(() => {
        qS('.pizzaWindowArea').style.opacity = 1;
      }, 200)
    })
  });

  qS('.pizza-area').append(pizzaItem);
});

// Eventos do modal
function closeModal(e) {
  e.preventDefault();

  qS('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    qS('.pizzaWindowArea').style.display = 'none';
  }, 500)
}

events.forEach(userEvent => {
  qSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(btn => {
    btn.addEventListener(userEvent, closeModal);
  });

  document.addEventListener(userEvent, e => {
    if (e.target.classList.contains('pizzaWindowArea')) {
      closeModal(e);
    }
  })

  qS('.pizzaInfo--qtmenos').addEventListener(userEvent, (e) => {
    e.preventDefault();
    if (modalQt > 1) 
      modalQt--;
      qS('.pizzaInfo--qt').innerHTML = modalQt;
  });

  qS('.pizzaInfo--qtmais').addEventListener(userEvent, (e) => {
    e.preventDefault();

    modalQt++;
    qS('.pizzaInfo--qt').innerHTML = modalQt;
  });

  qSA('.pizzaInfo--size').forEach(size => {
    size.addEventListener(userEvent, e => {
      e.preventDefault();
      qS('.pizzaInfo--size.selected').classList.remove('selected');
      size.classList.add('selected');
    })
  });

  qS('.pizzaInfo--addButton').addEventListener(userEvent, e => {
    e.preventDefault();

    const size = Number(qS('.pizzaInfo--size.selected').getAttribute('data-key'));

    const identifier = pizzaJson[modalKey].id+'@'+size;

    const key = cart.findIndex(item => item.identifier === identifier);
    if (key > -1) {
      cart[key].qt += modalQt;

    } else {
      cart.push({
        identifier: identifier,
        id: pizzaJson[modalKey].id,
        size: size,
        qt: modalQt
      });
    }

    updateCart();
    closeModal(e);
  });
});

events.forEach(userEvent => {
  qS('.menu-openner').addEventListener(userEvent, e => {
    e.preventDefault();

    if (cart.length > 0) {
      qS('aside').style.left = '0';
    }
  });

  qS('.menu-closer').addEventListener(userEvent, e => {
    e.preventDefault();

    qS('aside').style.left = '100vw';
  });
});

function updateCart() {
  qS('.menu-openner span').innerHTML = cart.length;

  if (cart.length > 0) {
    qS('aside').classList.add('show');
    qS('.cart').innerHTML = '';

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    cart.forEach((el, index) => {
      const pizzaItem = pizzaJson.find(item => item.id === cart[index].id);
      subtotal += pizzaItem.price * cart[index].qt;

      const cartItem = qS('.models .cart--item').cloneNode(true);

      let pizzaSizeName;
      switch (cart[index].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }

      const pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[index].qt;

      events.forEach(userEvent => {
        cartItem.querySelector('.cart--item-qtmenos').addEventListener(userEvent, e => {
          e.preventDefault();

          if (cart[index].qt > 1) {
            cart[index].qt--;

          } else {
            cart.splice(index, 1);
          }

          updateCart();
        });

        cartItem.querySelector('.cart--item-qtmais').addEventListener(userEvent, e => {
          e.preventDefault();
          cart[index].qt++;
          updateCart();
        });
      })

      qS('.cart').append(cartItem);
    })

    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    qS('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    qS('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2).replace('.', ',')}`;
    qS('.total span:last-child').innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`;

  } else {
    qS('aside').classList.remove('show');
    qS('aside').style.left = '100vw';
  }
}