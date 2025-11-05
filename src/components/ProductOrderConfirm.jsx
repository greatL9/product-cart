import { useCart } from "../useCart";
import { Button } from "./reusables/Button";

export function ProductOrderConfirm() {
  const { cart, totalAmount, handleOverlayClick, handleNewOrder } = useCart();

  // console.log(cart);

  return (
    <>
      <div className="flex flex-col gap-12 fixed z-[50] w-[30rem] md:w-[40rem] max-h-[90vh] overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white p-8 rounded-2xl">
        <div className="flex flex-col justify-center items-start gap-12">
          <img src="/assets/images/icon-order-confirmed.svg" alt="Done icon" />

          <div className="flex flex-col justify-center gap-6">
            <h2 className="text-4xl font-bold">Order Confirmed</h2>

            <p className="text-[1.2rem]">We hope you enjoy your food!</p>
          </div>
        </div>

        <div className="flex flex-col gap-12 bg-[var(--color-rose-50)] p-6 rounded-2xl">
          <ul className=" flex flex-col justify-center gap-4">
            {cart.map((item) => (
              <OrderedItem key={item.name} item={item} cart={cart} />
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <p className="text-[1.2rem] text-[var(--color-rose-500)] font-medium">
              Order Total
            </p>

            <p className="text-3xl md:text-4xl text-[var(--color-rose-900)] font-bold">
              ${totalAmount}
            </p>
          </div>
        </div>

        <Button
          onClick={handleNewOrder}
          className="place-items-stretch smooth-trans"
        >
          start new order
        </Button>
      </div>

      <div
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-[3px] z-[40] transition-opacity duration-300"
      ></div>
    </>
  );
}

function OrderedItem({ item }) {
  function handleGetImagePath(productImage) {
    let fileName = productImage.category || productImage.name;

    fileName = fileName
      .normalize("NFD") //remove accents like é, ñ, ü
      .replace(/[\u0300-\u036f]/g, "") //remove diacritics
      .replace(/\s+/g, "-") //replace spaces with hyphens
      .toLowerCase(); //converts to lower case

    return `/assets/images/image-${fileName}-thumbnail.jpg`;
  }

  return (
    <>
      <li className="grid grid-cols-[3fr_10fr_1fr] items-center gap-6">
        <div>
          <img
            src={handleGetImagePath(item.product)}
            alt={item.product.name}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold w-[13rem] md:w-full truncate">
            {item.product.name}
          </h3>

          <div className="flex items-center gap-4">
            <p className="text-[1.2rem] text-[var(--color-red)] font-bold">
              {item.quantity}x
            </p>

            <p className="text-gray-600 font-semibold text-xl">
              @ ${item.product.price}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[var(--color-rose-900)] text-2xl font-bold">
            ${item.product.price * item.quantity}
          </p>
        </div>
      </li>

      <hr className=" opacity-15" />
    </>
  );
}
