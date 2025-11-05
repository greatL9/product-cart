import { useCart } from "../useCart";
import { Button } from "./reusables/Button";

export const ProductCheckout = () => {
  const { cart, handleDeleteCart, totalAmount, handleIsConfirm } = useCart();

  const isCartEmpty = cart.length === 0;

  const numberOfItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartCheckoutBox numberOfItems={numberOfItems}>
      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <FilledCart
          cart={cart}
          onDeleteCart={handleDeleteCart}
          totalAmount={totalAmount}
          onConfirm={handleIsConfirm}
        />
      )}
    </CartCheckoutBox>
  );
};

function FilledCart({ cart, onDeleteCart, totalAmount, onConfirm }) {
  return (
    <>
      {cart.map((cartItem) => (
        <>
          <div
            className="flex items-center justify-between"
            key={cartItem.product.name}
          >
            <div>
              <p className="font-semibold text-[1.3rem] mb-2">
                {cartItem.product.name}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-[1.2rem] font-semibold text-[var(--color-red)]">
                  {cartItem.quantity}x
                </span>
                <span className="text-[1.2rem] font-semibold text-gray-600">
                  @${cartItem.product.price}
                </span>
                <span className="text-[1.2rem] font-semibold text-gray-600">
                  ${cartItem.product.price * cartItem.quantity}
                </span>
              </div>
            </div>

            <button
              onClick={() => onDeleteCart(cartItem.product.name)}
              className="rounded-full cursor-pointer p-[6px]! cancel-btn"
            >
              <img
                src="/assets/images/icon-remove-item.svg"
                alt="cancel icon"
              />
            </button>
          </div>
          <hr />
        </>
      ))}

      <div className="flex items-center justify-between">
        <span className="inline-block text-[1.2rem]">Order Total</span>

        <p className="text-3xl font-bold">${totalAmount.toFixed(2)}</p>
      </div>

      <p className="flex items-center justify-center gap-4 rounded-2xl bg-[var(--color-rose-100)] py-[8px]!">
        <img
          src="/assets/images/icon-carbon-neutral.svg"
          alt="carbon neutral icon"
        />

        <span>
          This is a <strong>carborn-neutral</strong> delivery
        </span>
      </p>

      <Button className="smooth-trans" onClick={() => onConfirm()}>
        confirm order
      </Button>
    </>
  );
}

function EmptyCart() {
  return (
    <div className="place-items-center">
      <img
        src="/assets/images/illustration-empty-cart.svg"
        alt="empty cart icon"
      />

      <p className="text-xl font-medium text-[var(--color-rose-500)]">
        Your added items will appear here
      </p>
    </div>
  );
}

function CartCheckoutBox({ children, numberOfItems }) {
  return (
    <div className="md:place-items-center">
      <div className="bg-white md:w-[35rem] flex flex-col gap-8 rounded-3xl py-[2rem]! px-[3rem]!">
        <h3 className="text-3xl font-bold text-[var(--color-red)]">
          Your Cart ({numberOfItems})
        </h3>

        {children}
      </div>
    </div>
  );
}
